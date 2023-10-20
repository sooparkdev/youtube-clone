import { useState, useEffect, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export const useFetchAndNormalize = (configFunction, criteria, fetchMore) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);

  const config = useMemo(() => {
    if (!criteria) return null;
    return configFunction(criteria);
  }, [configFunction, criteria]);

  const { rawData, error } = useFetch(config);

  useEffect(() => {
    if (rawData?.kind && rawData?.items) {
      setResults(normalizeRawData(rawData.kind, rawData.items));
    }
    setLoading(false);
  }, [rawData, error]);

  return { results, loading, error };
};