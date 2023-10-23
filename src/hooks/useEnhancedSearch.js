import React from "react";
import VideoList from "../components/VideoList";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  getSearchVideosConfig,
  getVideoDetailsConfig,
  getChannelsConfig,
} from "../utils/getYoutubeApiConfigs";
import usePaginatedFetchAndNormalize from "./usePaginatedFetchAndNormalize";
import useFetchAndNormalize from "./useFetchAndNormalize";
import mockSearchResult from "../mock/mockSearchResult.json";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export default function useEnhancedSearch(query, fetchMore) {
  const [fullVideoInfo, setFullVideoInfo] = useState(null);

  const [intermediateSearchResults, setIntermediateSearchResults] = useState(null);
  const [intermediateVideoResults, setIntermediateVideoResults] = useState(null);
  const [intermediateChannelResults, setIntermediateChannelResults] = useState(null);

  useEffect(() => {
    setIntermediateChannelResults(null);
    setIntermediateVideoResults(null);
    setIntermediateChannelResults(null);
  }, [fetchMore])

  const {
    results: searchResults,
    loading: searchLoading,
    error: searchError,
  } = usePaginatedFetchAndNormalize(getSearchVideosConfig, query, fetchMore);

  useEffect(() => {
    if (searchError) {
      console.error("An error occured while getting search results ", searchError);
      return;
    }
    if (searchResults) {
      setIntermediateSearchResults(searchResults);
    }
  }, [searchResults, searchError]);

  const videoIds = useMemo(() => {
    return searchResults?.map((video) => video.videoId);
  }, [searchResults]);


  const {
    results: videoResults,
    loading: videoLoading,
    error: videoError,
  } = useFetchAndNormalize(getVideoDetailsConfig, videoIds, fetchMore);

  useEffect(() => {
    if (videoError) {
      console.error("An error occured while getting video results ", videoError);
      return;
    }
    if (videoResults) {
      setIntermediateVideoResults(videoResults);
    }
  }, [videoResults, videoError]);

  const channelIds = useMemo(() => {
    if (!searchResults) return undefined;

    return [...new Set(searchResults.map((video) => video.channelId))];
  }, [searchResults]);


  const {
    results: channelResults,
    loading: channelLoading,
    error: channelError,
  } = useFetchAndNormalize(getChannelsConfig, channelIds, fetchMore);

  useEffect(() => {
    if (channelError) {
      console.error("An error occured while getting channel results ", channelError);
      return;
    }
    if (channelResults) {
      setIntermediateChannelResults(channelResults);
    }
  }, [channelResults, channelError]);

  useEffect(() => {
    if (
      intermediateSearchResults &&
      intermediateVideoResults &&
      intermediateChannelResults
    ) {
      const combinedData = intermediateSearchResults.map(video => {
        const videoDetails = intermediateVideoResults.find(
          v => v.videoId === video.videoId
        );
        const channelDetails = intermediateChannelResults.find(
          c => c.channelId === video.channelId
        );

        const { videoId: _, ...otherVideoDetails } = videoDetails;
        const { channelId: __, ...otherChannelDetails } = channelDetails;

        return {
          ...video,
          ...otherVideoDetails,
          ...otherChannelDetails,
        };
      });

      setFullVideoInfo(combinedData);
    }
  }, [intermediateSearchResults, intermediateVideoResults, intermediateChannelResults]);

  const isLoading = searchLoading || videoLoading || channelLoading;
  const error = searchError || videoError || channelError;

  return {
    fullVideoInfo,
    isLoading,
    error,
  };
}
