import styles from "./VideoList.module.css";
import React from "react";
import LandscapeVideoCard from "../LandscapeVideoCard";
import PortraitVideoCard from "../PortraitVideoCard";
import Spinner from "../Spinner";

export default function VideoList({ videoList = [], layoutStyle, loading }) {
  let VideoCard;
  let layoutWrapper;
  let skeletonArray;

  if (layoutStyle === "portrait") {
    VideoCard = PortraitVideoCard;
    layoutWrapper = styles.portrait;
    skeletonArray = new Array(12).fill({});
  } else if (layoutStyle === "landscape") {
    VideoCard = LandscapeVideoCard;
    layoutWrapper = styles.landscape;
    skeletonArray = videoList ? [] : new Array(6).fill({});
  }

  return (
    <>
      <div className={layoutWrapper}>
        {videoList &&
          videoList.map((video) => (
            <VideoCard key={video.videoId} video={video} loading={false} />
          ))}
        {loading &&
          skeletonArray.map((_, index) => (
            <VideoCard key={index} video={{}} loading={true} />
          ))}
      </div>
      {videoList && loading && <Spinner />}
    </>
  );
}
