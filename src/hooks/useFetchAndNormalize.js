import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export default function useFetchAndNormalize(
  configFunction,
  criteria,
  fetchMore
) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (fetchMore) {
      setLoading(true);
    }
  }, [fetchMore]);

  useEffect(() => {
    if (criteria) {
      setLoading(true);
      setConfig(configFunction(criteria));
    }
  }, [criteria]);

  const { rawData, error } = useFetch(config);

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
