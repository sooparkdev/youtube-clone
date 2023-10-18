import React from "react";
import VideoList from "../components/VideoList";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  getSearchVideosConfig,
  getVideoDetailsConfig,
  getChannelsConfig,
} from "../utils/getYoutubeApiConfigs";
import { useFetchAndNormalize } from "../hooks/fetchAndTransform";
import mockSearchResult from "../mock/mockSearchResult.json";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export default function SearchPage() {
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState(null);
  const [pageToken, setPageToken] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setQuery(queryParams.get("query"));
  }, [location.search]);

  const {
    results: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useFetchAndNormalize(getSearchVideosConfig, query);

  useEffect(() => {
    if (searchResults) {
      setFullData(searchResults);
    }
  }, [searchResults]);

  //Augment with video details
  const videoIds = useMemo(() => {
    return searchResults?.map((video) => video.videoId);
  }, [searchResults]);

  const {
    results: videoResults,
    loading: videoLoading,
    error: videoError,
  } = useFetchAndNormalize(getVideoDetailsConfig, videoIds);

  useEffect(() => {
    if (videoResults) {
      setFullData((searchList) => {
        return searchList.map((video) => {
          const videoDetails = videoResults.find(
            (v) => v.videoId === video.videoId
          );
          const { videoId, ...otherVideoDetails } = videoDetails; // Destructure to exclude videoId
          return {
            ...video,
            ...otherVideoDetails, // Spread the rest of the properties excluding videoId
          };
        });
      });
    }
  }, [videoResults]);

  //Augment with channel details
  const channelIds = useMemo(() => {
    return [...new Set(searchResults?.map((video) => video.channelId))];
  }, [searchResults]);

  const {
    results: channelResults,
    loading: channelLoading,
    error: channelError,
  } = useFetchAndNormalize(getChannelsConfig, channelIds);

  useEffect(() => {
    if (channelResults) {
      setFullData((searchList) => {
        return searchList.map((video) => {
          const channelDetails = channelResults.find(
            (c) => c.channelId === video.channelId
          );
          const { channelId, ...otherChannelDetails } = channelDetails;
          return {
            ...video,
            ...otherChannelDetails,
          };
        });
      });
    }
  }, [channelResults]);

  // const anyError = searchError || videoError || channelError;
  const isFullDataLoading = searchLoading || videoLoading || channelLoading;

  
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !isFullDataLoading 
      ) {
        console.log("FETCH MOREEEEEEEEEEE!!!!!");
        // fetch more and updated fullData
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fullData]);

  const transformedData = normalizeRawData(
    mockSearchResult.kind,
    mockSearchResult.items
  );

  return (
    <>
      {/* {fullData?.length === 0 && !searchLoading && !anyError && (
        <div>
          <h1>No results found</h1>
          <p>Please enter a search term to see results.</p>
        </div>
      )} */}
      {fullData?.length > 0 && (
        <VideoList videoList={fullData} layoutStyle={"column"} />
      )}
      {/* <VideoList videoList={transformedData} layoutStyle={"column"} isLoading={true}/> */}
    </>
  );
}