import styles from "./VideoList.module.css";
import React from "react";
import VideoCard from "../VideoCard";

export default function VideoList({ videoList = [], layoutStyle, isLoading }) {
  const layoutClass = layoutStyle === "grid" ? styles.grid : styles.column;

  return (
    <div className={layoutClass}>
      {videoList?.map((video) => (
        <VideoCard
          key={video.videoId}
          video={video}
          layoutStyle={layoutStyle}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
