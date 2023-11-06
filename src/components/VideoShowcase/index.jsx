import styles from "./VideoShowcase.module.css";
import React from "react";
import ChannelAvatar from "../ChannelAvatar";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useState } from "react";

export default function VideoShowcase({ video = {}, loading }) {
  const [isVideoMetaExpanded, setIsVideoMetaExpanded] = useState(false);

  if (loading) {
    return (
      <>
        <div className={styles.videoContainer}>
        <div className={`${styles.aspectRatioBox} skeleton`} />
        </div>
        <div className={`${styles.videoCard} ${styles.skeletonCard}`} >
          <div className={`${styles.skeletonMediumText} skeleton`} />
          <div className={styles.skeletonRow}>
            <div className={`skeletonAvatar skeleton`} />
            <div className={`${styles.skeletonShortText} skeleton`} />
          </div>
          <div className={`${styles.skeletonLongText} skeleton`} />
        </div>
      </>
    );
  }

  const {
    videoId,
    title,
    description,
    channelThumbnails,
    channelTitle,
    subscriberCount,
    hiddenSubscriberCount,
    publishedAt,
    viewCount,
    likeCount,
  } = video || {};

  return (
    <>
      <div className={styles.videoContainer}>
        <div className={styles.aspectRatioBox}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            allowFullScreen
            title={`YouTube video with ID ${videoId}`}
            className={styles.video}
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>
      </div>
      <div className={styles.videoCard}>
        <p className={styles.videoTitle}>{title}</p>
        <div className={styles.videoDetails}>
          <div className={styles.channelInfo}>
            <ChannelAvatar
              channelThumbnails={channelThumbnails}
              title={title}
            />
            <div>
              <p className={styles.channelTitle}>{channelTitle}</p>
              {!hiddenSubscriberCount && (
                <p className={styles.subscriberCount}>
                  구독자 {subscriberCount}명
                </p>
              )}
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <button className={`${styles.button} ${styles.leftBtn}`}>
              <FiThumbsUp className={styles.thumbUpIcon} size={20} />
              <p className={styles.likeCount}>{likeCount}</p>
            </button>
            <button className={`${styles.button} ${styles.rightBtn}`}>
              <FiThumbsDown className={styles.thumbDownIcon} size={20} />
            </button>
          </div>
        </div>
        <div
          className={`${styles.videoMetaData}`}
          onClick={() => setIsVideoMetaExpanded((prev) => !prev)}
        >
          <div
            className={isVideoMetaExpanded ? "" : styles.collapsedVideoMetaData}
          >
            <p>
              조회수 <span>{viewCount}</span>회 <span>{publishedAt}</span>
            </p>
            <p> {description} </p>
          </div>
          <p className={styles.toggleStateLabel}>
            {isVideoMetaExpanded ? "간략히" : "더보기"}
          </p>
        </div>
      </div>
    </>
  );
}
