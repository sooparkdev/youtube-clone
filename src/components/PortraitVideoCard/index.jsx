import styles from "./PortraitVideoCard.module.css";
import React from "react";
import { useNavigate } from "react-router";
import ChannelAvatar from "../ChannelAvatar";
import VideoMetricsLabel from "../VideoMetricsLabel";
import LiveStreamBadge from "../LiveStreamBadge";

const LIVE_VIDEO_FLAG = "P0D";

export default function PortraitVideoCard({ video, loading }) {
  const navigate = useNavigate();
  const {
    videoId,
    title,
    channelThumbnails,
    channelTitle,
    publishedAt,
    thumbnails,
    duration,
    viewCount,
  } = video;

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.skeletonRatioBox} skeleton`} />
        <div className={styles.metaData}>
          <div className={`skeletonAvatar skeleton`} />
          <div className={styles.skeletonCol}>
            <div className={`${styles.skeletonLongText} skeleton`} />
            <div className={`${styles.skeletonMediumText} skeleton`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() =>
        navigate(`/watch?v=${videoId}`, { state: { from: 'DefaultPage', video: video } })
      }
      className={styles.wrapper}
    >
      <div className={styles.thumbnailContainer}>
        <img
          src={thumbnails.maxres?.url || thumbnails.medium.url}
          alt={title}
          className={styles.thumbnailImg}
        />
        <div className={styles.badge}>
          {duration && duration !== LIVE_VIDEO_FLAG && (
            <p className={styles.duration} alt="video duration">
              {duration}
            </p>
          )}
          {duration === LIVE_VIDEO_FLAG && <LiveStreamBadge />}
        </div>
      </div>
      <div className={styles.metaData}>
        <ChannelAvatar channelThumbnails={channelThumbnails} title={title} />
        <div>
          <p className={styles.videoTitle}> {title} </p>
          <p className={styles.channelName}> {channelTitle} </p>
          <VideoMetricsLabel viewCount={viewCount} publishedAt={publishedAt} />
        </div>
      </div>
    </div>
  );
}
