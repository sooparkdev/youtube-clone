import React from "react";
import VideoList from "../components/VideoList";
import mockMostPopularVideos from "../mock/mockMostPopularVideos.json";
import { useFetch } from "../hooks/useFetch";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";
import { getMostPopularVideosConfig } from "../utils/getYoutubeApiConfigs";
import useFetchAndNormalize from "../hooks/useFetchAndNormalize";

export default function DefaultPage() {
  // const config = getMostPopularVideosConfig();
  // const { rawData, loading, error } = useFetch(config);
  // const TrendingResults = normalizeRawData(rawData.kind, rawData);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  const transformedData = normalizeRawData(
   mockMostPopularVideos.kind,
   mockMostPopularVideos.items
  );

  // const {
  //   results: trendingResults,
  //   loading: trendLoading,
  //   error: trendError,
  // } = useFetchAndNormalize(getMostPopularVideosConfig, "KR");


  return (
    <div>
      {/* <VideoList videoList={trendingResults} layoutStyle={'grid'} /> */}
      <VideoList videoList={transformedData} layoutStyle={"grid"} />
    </div>
  );
}
