import { getMostPopularVideosConfig } from "../utils/getYoutubeApiConfigs";
import useFetchAndNormalize from "../hooks/useFetchAndNormalize";
import usePaginatedFetchAndNormalize from "../hooks/usePaginatedFetchAndNormalize";
import { useState, useEffect, useMemo } from "react";
import { getChannelsConfig } from "../utils/getYoutubeApiConfigs";
import { combineDatasets } from "../utils/dataCombiners";

export default function useTrendPipeline(fetchMore) {
  const [singlePageResults, setSinglePageResults] = useState(null);
  const [intermediateVideoResults, setIntermediateVideoResults] =
    useState(null);
  const [intermediateChannelResults, setIntermediateChannelResults] =
    useState(null);

  useEffect(() => {
    setIntermediateVideoResults(null);
    setIntermediateChannelResults(null);
  }, [fetchMore]);

  const {
    results: videoResults,
    loading: videoLoading,
    error: videoError,
  } = usePaginatedFetchAndNormalize(
    getMostPopularVideosConfig,
    "KR",
    fetchMore
  );

  useEffect(() => {
    if (videoResults) {
      setIntermediateVideoResults(videoResults);
    }
  }, [videoResults, videoError]);

  const channelIds = useMemo(() => {
    if (!videoResults) return undefined;
    return [videoResults.map((video) => video.channelId)];
  }, [videoResults]);

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
    if (intermediateVideoResults && intermediateChannelResults) {
      const combinedData = combineDatasets(
        intermediateVideoResults,
        intermediateChannelResults
      );
      setSinglePageResults(combinedData);
    }
  }, [intermediateVideoResults, intermediateChannelResults]);

  const loading = videoLoading || channelLoading;
  const error = videoError || channelError;

  return {
    singlePageResults,
    loading,
    error,
  };
}
