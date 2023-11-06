import styles from "./ChannelAvatar.module.css";
import React from "react";

export default function ChannelAvatar({ channelThumbnails, title }) {
  return (
    <div className={styles.channelAvatar}>
      <img
        src={channelThumbnails?.medium.url}
        alt={title}
        className={styles.avatarImage}
      />
    </div>
  );
}
