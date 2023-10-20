import React from "react";
import VideoList from "../components/VideoList";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  getSearchVideosConfig,
  getVideoDetailsConfig,
  getChannelsConfig,
} from "../utils/getYoutubeApiConfigs";
import { useFetchAndNormalize } from "./usePaginatedFetchAndNormalize";
import mockSearchResult from "../mock/mockSearchResult.json";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export default function useEnhancedSearch(query, fetchMore) {
  const [fullData, setFullData] = useState(null);

  console.log("Search hook");
  const {
    results: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useFetchAndNormalize(getSearchVideosConfig, query, fetchMore);

  useEffect(() => {
    if (searchError) {
      console.error(
        "An error occured while getting search results ",
        searchError
      );
      return;
    }
    if (searchResults) {
      setFullData(searchResults);
    }
  }, [searchResults, searchError]);

  const videoIds = useMemo(() => {
    console.log("video id recomputed");
    return searchResults?.map((video) => video.videoId);
  }, [searchResults]);

  console.log("Video hook");

  const {
    results: videoResults,
    loading: videoLoading,
    error: videoError,
  } = useFetchAndNormalize(getVideoDetailsConfig, videoIds);

  useEffect(() => {
    if (videoError) {
      console.error(
        "An error occured while getting video results ",
        videoError
      );
      return;
    }
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
  }, [videoResults, videoError]);

  const channelIds = useMemo(() => {
    if (!searchResults) return undefined;

    console.log("channel id recomputed");
    return [...new Set(searchResults.map((video) => video.channelId))];
  }, [searchResults]);

  console.log("Channel hook");

  const {
    results: channelResults,
    loading: channelLoading,
    error: channelError,
  } = useFetchAndNormalize(getChannelsConfig, channelIds);

  useEffect(() => {
    if (channelError) {
      console.error(
        "An error occured while getting channel results ",
        channelError
      );
      return;
    }
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
  }, [channelResults, channelError]);

  console.log("search loading ", searchLoading);
  console.log("video loading ", videoLoading);
  console.log("channel loading ", channelLoading);
  const isLoading = searchLoading || videoLoading || channelLoading;
  const error = searchError || videoError || channelError;

  return {
    fullData,
    isLoading,
    error,
  };
}
