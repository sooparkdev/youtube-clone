import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentThreadsConfig } from "../utils/getYoutubeApiConfigs";
import TopLevelCommentList from "../components/TopLevelCommentList";
import VideoShowcase from "../components/VideoShowcase";
import useVideoDetailsPipeline from "../hooks/useVideoDetailsPipeline";
import usePaginatedFetchAndNormalize from "../hooks/usePaginatedFetchAndNormalize";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import NoResultsPage from "./NoResultsPage";
import ErrorPage from "./ErrorPage";

export default function VideoDetailsPage() {
  const location = useLocation();
  const videoFromState = location.state?.video;
  const [video, setVideo] = useState(videoFromState);
  const queryParams = new URLSearchParams(location.search);
  const videoId = queryParams.get("v");

  const {
    result: videoFromFetch,
    loading: videoLoading,
    error: videoError,
  } = useVideoDetailsPipeline(videoId);

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
