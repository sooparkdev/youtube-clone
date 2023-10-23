import React from "react";
import VideoList from "../components/VideoList";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import mockSearchResult from "../mock/mockSearchResult.json";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";
import useEnhancedSearch from "../hooks/useEnhancedSearch";

export default function SearchPage() {
  console.log("SEARCH PAGE RENDER");
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [fetchMore, setFetchMore] = useState(false);
  const [incrementalSearchResults, setIncrementalSearchResults] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setQuery(queryParams.get("query"));
    setIncrementalSearchResults(null);
  }, [location.search]);

  const { fullData, isLoading, error } = useEnhancedSearch(query, fetchMore);

  useEffect(() => {
    if (fullData && !isLoading) {
      setFetchMore(false);
      setIncrementalSearchResults((prev) => {
        const seen = new Set();
        const combinedData = [...(prev || []), ...fullData];
        return combinedData.filter((item) => {
          const duplicate = seen.has(item.videoId);
          seen.add(item.videoId);
          return !duplicate;
        });
      });
    }
  }, [fullData]);

  useEffect(() => {
    const handleScroll = () => {
      // console.log(
       
      //   window.innerHeight + document.documentElement.scrollTop
      // );
      // console.log(document.documentElement.offsetHeight - 300);
      // console.log(
      //   window.innerHeight + document.documentElement.scrollTop >=
      //     document.documentElement.offsetHeight - 3000
      // );

      if (
        incrementalSearchResults &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 3000 &&
        !isLoading
      ) {
        console.log("fetch more");
        setFetchMore(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [incrementalSearchResults, isLoading]);

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
        <VideoList videoList={incrementalSearchResults} layoutStyle={"column"} />
      )}
      {/* <VideoList videoList={transformedData} layoutStyle={"column"} isLoading={true}/> */}
    </>
  );
}
