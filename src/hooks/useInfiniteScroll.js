import { useEffect } from "react";

export default function useInfiniteScroll(data, callback, loading) {
  const SCROLL_PRELOAD_DISTANCE = 300;

  useEffect(() => {
    const handleScroll = () => {
      if (
        data && (window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - SCROLL_PRELOAD_DISTANCE) &&
        !loading
      ) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, callback, loading]);
}