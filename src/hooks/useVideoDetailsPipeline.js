import {
  getVideoDetailsConfig,
} from "../utils/getYoutubeApiConfigs";
import useFetchAndNormalize from "./useFetchAndNormalize";
import { useState, useEffect, useMemo } from "react";
import { getChannelsConfig } from "../utils/getYoutubeApiConfigs";
import { combineDatasets } from "../utils/dataCombiners";

export default function useVideoDetailsPipeline(videoId, fetchMore) {
  const [result, setResult] = useState(null);
  const [intermediateVideoResult, setIntermediateVideoResult] = useState(null);
  const [intermediateChannelResult, setIntermediateChannelResult] =
    useState(null);

  useEffect(() => {
    setIntermediateVideoResult(null);
    setIntermediateChannelResult(null);
  }, [fetchMore]);

  const {
    results: videoResult,
    loading: videoLoading,
    error: videoError,
  } = useFetchAndNormalize(getVideoDetailsConfig, videoId);

  useEffect(() => {
    if (videoResult) {
      setIntermediateVideoResult(videoResult);
    }
  }, [videoResult, videoError]);

  const channelId = useMemo(() => {
    if (!videoResult) return undefined;
    return videoResult[0].channelId;
  }, [videoResult]);

  const {
    results: channelResult,
    loading: channelLoading,
    error: channelError,
  } = useFetchAndNormalize(getChannelsConfig, channelId);

  useEffect(() => {
    if (channelResult) {
      setIntermediateChannelResult(channelResult);
    }
  }, [channelResult, channelError]);

  useEffect(() => {
    if (intermediateVideoResult && intermediateChannelResult) {
      const combinedData = combineDatasets(
        intermediateVideoResult,
        intermediateChannelResult
      );
      setResult(combinedData);
    }
  }, [intermediateVideoResult, intermediateChannelResult]);

  const loading = videoLoading || channelLoading;
  const error = videoError || channelError;

  return {
    result,
    loading,
    error,
  };
}
