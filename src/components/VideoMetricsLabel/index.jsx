import styles from "./VideoMetricsLabel.module.css";

export default function VideoMetricsLabel({ viewCount, publishedAt }) {
  return (
    <div className={styles.wrapper}>
      {viewCount && <p> 조회수 {viewCount}회 </p>}
      {viewCount && publishedAt && <span className={styles.dottedCircle} />}
      <p> {publishedAt} </p>
    </div>
  );
}
