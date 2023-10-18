import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (config) => {
  const [rawData, setRawData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!config) {
      return; // this will exit the entire useEffect callback
      // In javascript, if a function doesn't explicitly return a value, it returns 'undefined' by default.
    }

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

/* A custom hook is essentially a function that encapsulates certain logic, often using other hooks like useState and useEffect. Every time you call this 
function (the custom hook) from a component, new instances of the stateful variables and effects within that custom hook are created specifically for that component. 
This allows components to share logic without sharing state. Each invocation of the custom hook is isolated to the calling component.

Here's a simplified analogy:
Think of a custom hook as a blueprint for building something (like the blueprint for a house). Every time you want to build a house (or use a custom hook in a component), 
you start with a fresh set of materials (new state, new effects). Even though multiple houses (components) might be built from the same blueprint (custom hook), 
each house is its own standalone structure with its own materials. They might look the same or behave similarly due to the shared blueprint, but they are distinct entities.

When the Search component calls useFetch, it creates its own instance of any state or effects inside useFetch.
When the Default component calls useFetch, it too creates its own separate instance of any state or effects inside useFetch.
*/
