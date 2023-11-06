import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";

export default function usePaginatedFetchAndNormalize(
  configFunction,
  criteria,
  fetchMore
) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if(criteria){
      setLoading(true);
      setConfig(configFunction(criteria))
      return;
    }
  }, [criteria])

  useEffect(() => {
    if(fetchMore && nextPageToken) {
      setLoading(true);
      setConfig(configFunction(criteria, nextPageToken));
    }
  }, [fetchMore])

  const { rawData, error } = useFetch(config);

  useEffect(() => {
    if (rawData) {
      setResults(normalizeRawData(rawData.kind, rawData.items));
      setNextPageToken(rawData.nextPageToken);
      setLoading(false);
    }
    if (rawData || error) {
      setLoading(false);
    }
  }, [rawData, error]);

  return { results, loading, error };
}
