import React from "react";
import VideoList from "../components/VideoList";
import { useState, useEffect } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useTrendPipeline from "../hooks/useTrendPipeline";
import ErrorPage from "./ErrorPage";
import NoResultsPage from "./NoResultsPage";

export default function DefaultPage() {
  const [fetchMore, setFetchMore] = useState(false);
  const [totalResults, setTotalResults] = useState(null);

  const { singlePageResults, loading, error } = useTrendPipeline(fetchMore);

  useEffect(() => {
    if (singlePageResults) {
      setFetchMore(false);
      setTotalResults((prev) => {
        const seen = new Set();
        const combinedData = [...(prev || []), ...singlePageResults];
        return combinedData.filter((item) => {
          const duplicate = seen.has(item.videoId);
          seen.add(item.videoId);
          return !duplicate;
        });
      });
    }
  }, [singlePageResults]);

  useInfiniteScroll(totalResults, () => setFetchMore(true), loading);

  if (error) {
    return <ErrorPage />;
  }

  if (!error && !loading && totalResults?.length === 0) {
    return (
      <NoResultsPage
        mainMessage="현재 트렌딩 중인 비디오가 없습니다"
        description="나중에 다시 확인해주세요. 대신 검색을 이용해보세요!"
      />
    );
  }

  return (
    <div>
      <VideoList
        videoList={totalResults}
        layoutStyle="portrait"
        loading={loading}
      />
    </div>
  );
}
