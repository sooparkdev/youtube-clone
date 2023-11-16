import { getVideoDetailsConfig } from "../utils/getYoutubeApiConfigs";
import useFetchAndNormalize from "./useFetchAndNormalize";
import { useState, useEffect, useMemo } from "react";
import { getChannelsConfig } from "../utils/getYoutubeApiConfigs";
import { combineDatasets } from "../utils/dataCombiners";

export default function useVideoDetailsPipeline(
  videoId,
  shouldFetchChannelDetails,
  channelInfo
) {
  const [result, setResult] = useState(null);
  const [intermediateVideoResult, setIntermediateVideoResult] = useState(null);
  const [intermediateChannelResult, setIntermediateChannelResult] =
    useState(null);

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
    if (!videoResult || !shouldFetchChannelDetails) return undefined;
    return videoResult[0].channelId;
  }, [videoResult, shouldFetchChannelDetails]);

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
    if (intermediateVideoResult && (channelInfo || intermediateChannelResult)) {
      const combinedData = combineDatasets(
        intermediateVideoResult,
        channelInfo || intermediateChannelResult
      );
      setResult(combinedData);
    }
  }, [intermediateVideoResult, intermediateChannelResult, channelInfo]);

  const loading = videoLoading || channelLoading;
  const error = videoError || channelError;

  return {
    result,
    loading,
    error,
  };
}
