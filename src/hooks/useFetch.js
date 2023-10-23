import { useEffect, useState, useRef } from "react";
import axios from "axios";
import isEqual from "lodash/isEqual";

export const useFetch = (config) => {
  const [rawData, setRawData] = useState(null);
  const [error, setError] = useState(null);

  const prevConfigRef = useRef();

  useEffect(() => {
    if (!config || isEqual(prevConfigRef.current, config)) {
      return;
    }

    prevConfigRef.current = config;

    const fetchData = async () => {
      try {
        const response = await axios(config);
        setRawData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [config]);

  return { rawData, error };
};
