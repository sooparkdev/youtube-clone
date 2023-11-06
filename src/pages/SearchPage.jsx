import React from "react";
import VideoList from "../components/VideoList";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useSearchPipeline from "../hooks/useSearchPipeline";
import ErrorPage from "./ErrorPage";
import NoResultsPage from "./NoResultsPage";

export default function SearchPage() {
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [fetchMore, setFetchMore] = useState(false);
  const [totalResults, setTotalResults] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setQuery(queryParams.get("query"));
    setTotalResults(null);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.search]);

  const { singlePageResults, loading, error } = useSearchPipeline(
    query,
    fetchMore
  );

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
        mainMessage="검색 결과가 없습니다"
        description="검색어를 조정하여 원하시는 내용을 찾아보세요."
      />
    );
  }

  return (
    <VideoList
      videoList={totalResults}
      layoutStyle="landscape"
      loading={loading}
    />
  );
}
