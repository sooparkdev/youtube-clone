import { useState, useEffect, useMemo, useRef } from "react";
import { useFetch } from "./useFetch";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export const usePaginatedFetchAndNormalize = (configFunction, criteria, fetchMore) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);

  const previousFetchMore = useRef(fetchMore);

  //   const [config, setConfig] = useState(null);
  //   useEffect(() => {
  //     if(!criteria) {
  //       setConfig(null);
  //   } else if (fetchMore && nextPageToken) {
  //     setConfig(configFunction(criteria, nextPageToken));
  //   } else {
  //     setConfig(configFunction(criteria));
  //   }

  // }, [configFunction, criteria, fetchMore]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = useMemo(() => {
    if (!criteria || (!fetchMore && previousFetchMore.current === true))
      return null;
    if (fetchMore && nextPageToken)
      return configFunction(criteria, nextPageToken);
    return configFunction(criteria); //fetchMore 이 true 였다가 false로 바뀔 때 여길 들어감; 즉, next page fetch request 를 보낸 다음, 여기에 필연적으로 한번 들어간다는 거지. !!!!!! 여기다 여기가 문제다!!!!!!!!!!! ㅅㅂ 여기임!
  }, [configFunction, criteria, fetchMore]);

  previousFetchMore.current = fetchMore;

  const { rawData, error } = useFetch(config);

  /* fetchMore를 당장 current fetch가 이뤄지는 동안 안 바꾼다고 해도, 언젠간 바꾸긴 해야 한다 말이지. 그리고 그 언젠가는 next page fetching이 UI에 rendering 되고 나서, bottom of the
  page가 더 밑으로 바뀌었을 때, fetchMore shouldn't be true, cause we're not even at the bottom of the page, as it's shifted down. 그러니까 어쨌든 언젠가 바뀌면
  위의 문제의 line configFunction(criteria)가 한번은 execute된다는 거야. */

  /*fetchMore이 계속 true일 때, we don't recreate config. so even if the component re-renders while fetchMore is still true, we don't recreate config 
  therefore we don't retrigger fetch. 근데 우리가 additional fetch 한번 보낸 이후에 fetchMore를 false로 바꿨을 때, this is going to recreate config.
  and when this config is sent to the useFetch hook, and we don't do a deep check on it, it would send the fetch again.*/

  useEffect(() => {
    // Only proceed if fetchMore changes from false to true
    console.log("1");
    if (fetchMore === true) {
      // 애초에 if(fetchMore) 이 지금 현재 이 staement랑 똑같은 걸 하고 있는 거임.
      console.log("enter if");
      setLoading(true);
    }
  }, [fetchMore]);

  useEffect(() => {
    if (rawData) {
      setResults(normalizeRawData(rawData.kind, rawData.items));
      setNextPageToken(rawData.nextPageToken);
    }
    if (rawData || error) {
      setLoading(false);
    }
  }, [rawData, error]);

  return { results, loading, error };
};

// import { useState, useEffect, useMemo } from "react";
// import { useFetch } from "../hooks/useFetch";
// import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

// export const useFetchAndNormalize = (configFunction, criteria, fetchMore) => {
//   const [loading, setLoading] = useState(true);
//   const [results, setResults] = useState(null);
//   const [nextPageToken, setNextPageToken] = useState(null);

// // eslint-disable-next-line react-hooks/exhaustive-deps
//   const config = useMemo(() => {
//     if (!criteria) {
//       return null;
//     } else if (fetchMore && nextPageToken) {
//       return configFunction(criteria, nextPageToken);
//     }
//     return configFunction(criteria);
//     //setLoading(true) should be added somewhere here
//   }, [configFunction, criteria, fetchMore]); // pageToken 을 어쩔 수 없이 include 해야 한다면 useFetch 안에서 config deep check 을 해야할 듯

//   const { rawData, error } = useFetch(config);

//   useEffect(() => {
//     if (rawData) {
//       setResults(normalizeRawData(rawData.kind, rawData.items));
//       setNextPageToken(rawData.nextPageToken)
//     }
//     setLoading(false);
//   }, [rawData, error]);

//   return { results, loading, error };
// };
