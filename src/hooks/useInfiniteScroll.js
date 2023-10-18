import { useEffect } from "react";

export function useInfiniteScroll(callback, isLoading) {
     useEffect(() => {
         const handleScroll = () => {
             if (
                 window.innerHeight + document.documentElement.scrollTop ===
                     document.documentElement.offsetHeight &&
                 !isLoading
             ) {
                 callback();
             }
         };
 
         window.addEventListener("scroll", handleScroll);
         return () => window.removeEventListener("scroll", handleScroll);
     }, [callback, isLoading]);
 }
 