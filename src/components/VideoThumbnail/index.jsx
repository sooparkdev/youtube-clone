import React from 'react'
import styles from "./VideoThumbnail.module.css";

export default function VideoThumbnail({thumbnails, duration, title, layout}) {
  return (
     <div className={styles.thubmnailContainer}>
     <img
       src={thumbnails.maxres?.url || thumbnails.high.url}
       alt={title}
       className={styles.thumbnail}
     />
     <p className={styles.duration} alt="video duration"> {duration} </p>
   </div>
  )
}
