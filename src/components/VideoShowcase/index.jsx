import styles from "./VideoShowcase.module.css";
import React from "react";

export default function VideoShowcase() {
  return (
    <div className={styles.container}>
      {/* <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameborder="0"
        allowFullScreen
        title={`YouTube video with ID ${videoId}`}
      ></iframe> */}
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/G0iauGUCZe4`}
        allowFullScreen
        title={`YouTube video with ID G0iauGUCZe4`}
        className={styles.video}
      ></iframe>
    </div>
  );
}
