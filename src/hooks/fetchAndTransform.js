import { useState, useEffect, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export const useFetchAndNormalize = (configFunction, param) => {
  const config = useMemo(() => {
    if (!param) return null;
    return configFunction(param);
  }, [configFunction, param]);

  const { rawData, error } = useFetch(config);
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (rawData?.kind && rawData?.items) {
      setResults(normalizeRawData(rawData.kind, rawData.items));
    }
    setLoading(false);
  }, [rawData, error]);

  return { results, loading, error };
};
