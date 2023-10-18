import styles from "./VideoCard.module.css";
import React from "react";
import { useNavigate } from "react-router";

export default function VideoCard({ video, layoutStyle, isLoading }) {
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
  const layoutClass = layoutStyle === "grid" ? styles.grid : styles.column;

  const ThumbnailContent = () => (
    <div className={styles.thumbnailContainer}>
      <img
        src={thumbnails.maxres?.url || thumbnails.medium.url}
        alt={title}
        className={styles.thumbnail}
      />
      <p className={styles.duration} alt="video duration">
        {duration}
      </p>
    </div>
  );

  const ChannelAvatar = () => (
    <div className={styles.channelAvatar}>
      {channelThumbnails?.medium.url ?
      <img
        src={channelThumbnails?.medium.url}
        alt={title}
        className={styles.avatarImage}
      /> : <div className={styles.skeletonAvatarImage} />}
    </div>
  );

  const AdditionalInfo = () => (
    <div className={styles.additionalInfo}>
      {viewCount && <p className={styles.viewsCount}> 조회수 {viewCount}회 </p>}
      {viewCount && publishedAt && (<span className={styles.dottedCircle} />)}
      <p className={styles.publishDate}> {publishedAt} </p>
    </div>
  );

  return (
    <div
      onClick={() =>
        navigate(`/watch?v=${videoId}`, { state: { videoData: video } })
      }
      className={layoutClass}
    >
      <ThumbnailContent />
      <div className={styles.videoMetaData}>
        {layoutStyle === "grid" ? (
          <>
            <ChannelAvatar />
            <div>
              <p className={styles.videoTitle}> {title} </p>
              <p className={styles.channelName}> {channelTitle} </p>
              <AdditionalInfo />
            </div>
          </>
        ) : (
          <>
            <p className={styles.videoTitle}> {title} </p>
            <AdditionalInfo />
            <div className={styles.channelProfile}>
              <ChannelAvatar />
              <p className={styles.channelName}> {channelTitle} </p>
            </div>
            <p className={styles.videoDescription}> {description} </p>
          </>
        )}
      </div>
    </div>
  );
}
