import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getCommentThreadsConfig } from "../utils/getYoutubeApiConfigs";
import TopLevelCommentList from "../components/TopLevelCommentList";
import VideoShowcase from "../components/VideoShowcase";
import useVideoDetailsPipeline from "../hooks/useVideoDetailsPipeline";
import usePaginatedFetchAndNormalize from "../hooks/usePaginatedFetchAndNormalize";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import NoResultsPage from "./NoResultsPage";
import ErrorPage from "./ErrorPage";

export default function VideoDetailsPage() {
  const { state, search } = useLocation();
  const { video: videoFromState, from: navigatedFrom } =
    state || {};
    const videoId = useMemo(() => {
      return new URLSearchParams(search).get("v");
    }, [search]);  const [video, setVideo] = useState(videoFromState);
  const [videoIdToFetch, setVideoIdToFetch] = useState(null);
  const [shouldFetchChannelDetails, setShouldFetchChannelDetails] = useState(false);
  const [channelInfoFromState, setChannelInfoFromState] = useState(null);


  useEffect(() => {
    let videoIdToFetch;
    let shouldFetchChannelDetails;
    let channelInfoFromState;
  
    if (navigatedFrom === "SearchPage") {
      videoIdToFetch = videoId;
      shouldFetchChannelDetails = false;
      channelInfoFromState = extractChannelInfoFromState(
        videoFromState
      );
    } else if (navigatedFrom === undefined) {
      videoIdToFetch = videoId;
      shouldFetchChannelDetails = true;
    } else if (navigatedFrom === "DefaultPage") {
      videoIdToFetch = null;
      shouldFetchChannelDetails = false;
    }

    setVideoIdToFetch(videoIdToFetch);
    setShouldFetchChannelDetails(shouldFetchChannelDetails);
    setChannelInfoFromState(channelInfoFromState);
  
  }, [navigatedFrom, videoId, videoFromState]); 
  

  const {
    result: videoFromFetch,
    loading: videoLoading,
    error: videoError,
  } = useVideoDetailsPipeline(
    videoIdToFetch,
    shouldFetchChannelDetails,
    channelInfoFromState
  );

  useEffect(() => {
    if (videoFromFetch) {
      setVideo(videoFromFetch[0]);
    }
  }, [videoFromFetch]);

  const [fetchMore, setFetchMore] = useState(false);
  const [totalCommentResults, setTotalCommentResults] = useState(null);

  const {
    results: singlePageCommentResults,
    loading: commentsLoading,
    error: commentsError,
  } = usePaginatedFetchAndNormalize(
    getCommentThreadsConfig,
    videoId,
    fetchMore
  );

  useEffect(() => {
    if (singlePageCommentResults) {
      setFetchMore(false);
      setTotalCommentResults((prev) => [
        ...(prev || []),
        ...singlePageCommentResults,
      ]);
    }
  }, [singlePageCommentResults]);

  useInfiniteScroll(
    totalCommentResults,
    () => setFetchMore(true),
    commentsLoading
  );

  if (videoError) {
    return <ErrorPage />;
  }

  if (!videoError && video?.length === 0) {
    return (
      <NoResultsPage
        mainMessage="해당하는 비디오를 찾을 수 없습니다"
        description="URL를 다시 확인해보세요. 오타가 있을 수 있습니다."
      />
    );
  }

  return (
    <div className="videoDetailsPageContainer">
      <VideoShowcase video={video} loading={videoLoading} />
      <TopLevelCommentList
        commentList={totalCommentResults}
        loading={commentsLoading}
        error={commentsError}
      />
    </div>
  );
}

function extractChannelInfoFromState(videoDetails) {
  return (
    videoDetails && [
      {
        channelId: videoDetails.channelId,
        channelThumbnails: videoDetails.channelThumbnails,
        subscriberCount: videoDetails.subscriberCount,
        hiddenSubscriberCount: videoDetails.hiddenSubscriberCount,
      },
    ]
  );
}
