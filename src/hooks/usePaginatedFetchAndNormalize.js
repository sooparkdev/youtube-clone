import { useState, useEffect, useMemo, useRef } from "react";
import { useFetch } from "./useFetch";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export default function usePaginatedFetchAndNormalize(
  configFunction,
  criteria,
  fetchMore
) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);

  const previousFetchMore = useRef(fetchMore);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = useMemo(() => {
    if (!criteria || (!fetchMore && previousFetchMore.current === true)) {
      return null;
    }
    if (fetchMore && nextPageToken)
      return configFunction(criteria, nextPageToken);
    return configFunction(criteria);
  }, [configFunction, criteria, fetchMore]);

  previousFetchMore.current = fetchMore;

  const { rawData, error } = useFetch(config);

  useEffect(() => {
    if (fetchMore === true) {
      setLoading(true);
    }
  }, [fetchMore]);

  useEffect(() => {
    setLoading(true);
  }, [criteria]);

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
}
