import { useEffect, useState, useMemo } from "react";
import {
  getSearchVideosConfig,
  getVideoDetailsConfig,
  getChannelsConfig,
} from "../utils/getYoutubeApiConfigs";
import usePaginatedFetchAndNormalize from "./usePaginatedFetchAndNormalize";
import useFetchAndNormalize from "./useFetchAndNormalize";
import { combineDatasets } from "../utils/dataCombiners";

export default function useSearchPipeline(query, fetchMore) {
  const [singlePageResults, setSinglePageResults] = useState(null);
  const [intermediateSearchResults, setIntermediateSearchResults] =
    useState(null);
  const [intermediateVideoResults, setIntermediateVideoResults] =
    useState(null);
  const [intermediateChannelResults, setIntermediateChannelResults] =
    useState(null);

  useEffect(() => {
    setIntermediateSearchResults(null);
    setIntermediateVideoResults(null);
    setIntermediateChannelResults(null);
  }, [fetchMore, query]);

  const {
    results: searchResults,
    loading: searchLoading,
    error: searchError,
  } = usePaginatedFetchAndNormalize(getSearchVideosConfig, query, fetchMore);

  useEffect(() => {
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
      const combinedData = combineDatasets(
        intermediateSearchResults,
        intermediateVideoResults,
        intermediateChannelResults
      );
      setSinglePageResults(combinedData);
    }
  }, [
    intermediateSearchResults,
    intermediateVideoResults,
    intermediateChannelResults,
  ]);

  const loading = searchLoading || videoLoading || channelLoading;
  const error = searchError || videoError || channelError;

  return {
    singlePageResults,
    loading,
    error,
  };
}
