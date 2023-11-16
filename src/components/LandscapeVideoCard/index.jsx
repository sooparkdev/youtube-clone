import styles from "./LandscapeVideoCard.module.css";
import React from "react";
import { useNavigate } from "react-router";
import ChannelAvatar from "../ChannelAvatar";
import VideoMetricsLabel from "../VideoMetricsLabel";
import LiveStreamBadge from "../LiveStreamBadge";

const LIVE_VIDEO_FLAG = "P0D";

export default function LandscapeVideoCard({ video, loading }) {
  const navigate = useNavigate();
  const {
    videoId,
    title,
    description,
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
        <div className={`${styles.thumbnailContainer} skeleton`}>
          <div className={`${styles.aspectRatioBox}`} />
        </div>
        <div className={styles.metaData}>
          <div className={`${styles.skeletonMediumText} skeleton`} />
          <div className={`${styles.skeletonShortText} skeleton`} />
          <div className={styles.channelProfile}>
            <div className={`skeletonAvatar skeleton`} />
            <div className={`${styles.skeletonShortText} skeleton`} />
          </div>
          <div className={`${styles.skeletonLongText} skeleton`} />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() =>
        navigate(`/watch?v=${videoId}`, { state: { from: 'SearchPage', video: video } })
      }
      className={styles.wrapper}
    >
      <div className={styles.thumbnailContainer}>
        <div className={styles.aspectRatioBox}>
          <img
            src={thumbnails.maxres?.url || thumbnails.high.url}
            alt={title}
            className={styles.thumbnailImg}
          />
          {duration && duration !== LIVE_VIDEO_FLAG && <p className={styles.duration} alt="video duration">
            {duration}
          </p>}
        </div>
      </div>
      <div className={styles.metaData}>
        <p className={styles.videoTitle}> {title} </p>
        <VideoMetricsLabel viewCount={viewCount} publishedAt={publishedAt} />
        <div className={styles.channelProfile}>
          <ChannelAvatar channelThumbnails={channelThumbnails} title={title} />
          <p className={styles.channelName}> {channelTitle} </p>
        </div>
        <p className={styles.videoDescription}> {description} </p>
        {duration === LIVE_VIDEO_FLAG && <LiveStreamBadge />}
      </div>
    </div>
  );
}
