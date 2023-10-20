import React from "react";
import VideoList from "../components/VideoList";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  getSearchVideosConfig,
  getVideoDetailsConfig,
  getChannelsConfig,
} from "../utils/getYoutubeApiConfigs";
import { useFetchAndNormalize } from "../hooks/usePaginatedFetchAndNormalize";
import mockSearchResult from "../mock/mockSearchResult.json";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

import useEnhancedSearch from "../hooks/useEnhancedSearch";

const loadBeforeBottomDistance = 50;

export default function SearchPage() {
  console.log("SEARCH PAGE RENDER");
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [fetchMore, setFetchMore] = useState(false);
  const [growingData, setGrowingData] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setQuery(queryParams.get("query"));
  }, [location.search]);

  const { fullData, isLoading, error } = useEnhancedSearch(query, fetchMore);

  //일단 얕은 문제는 fullData가 upate될 때마다, 총 세번 여기를 들어간다는 거야. if block 제대로 filter를 못 해주고 있음, check 가 약해, isLoading이 쓸모가 없어
  // 왜냐면 on all subseuquent fetches (after the initial fetch) the loading of video 랑 channel endpoint is never set to TRUE, because the loading changes to true
  // only when fetchMore changes, but those two are never passed fetchMore parmeter.
  useEffect(() => {
    if (fullData && !isLoading) {
      console.log(fullData);
      console.log(isLoading);

      setFetchMore(false);
      setGrowingData((prev) => [...(prev || []), ...fullData]); // seems like this is triggered three times, which could be related to how we have 3 fetchings going on in total
    }
  }, [fullData]); //isLoading을 추가하면 망가질 수 있음. 조금 더 생각해보셈 어떻게 해야할지

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        console.log("FETCH MOREEEEEEEEEEE!!!!!");
        // fetch more and updated fullData
        setFetchMore(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fullData, isLoading]);

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
        <VideoList videoList={growingData} layoutStyle={"column"} />
      )}
      {/* <VideoList videoList={transformedData} layoutStyle={"column"} isLoading={true}/> */}
    </>
  );
}
