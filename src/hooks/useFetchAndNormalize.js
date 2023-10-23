import { useState, useEffect, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export default function useFetchAndNormalize(
  configFunction,
  criteria,
  fetchMore
) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);

  const config = useMemo(() => {
    if (!criteria) return null;
    return configFunction(criteria);
  }, [configFunction, criteria]);

  const { rawData, error } = useFetch(config);

  useEffect(() => {
    if (fetchMore === true) {
      setLoading(true);
    }
  }, [fetchMore]);

  useEffect(() => {
    if (rawData) {
      setResults(normalizeRawData(rawData.kind, rawData.items));
    }
    if (rawData || error) {
      setLoading(false);
    }
  }, [rawData, error]);

  return { results, loading, error };
}
