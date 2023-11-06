import styles from "./CommentCard.module.css";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

export default function CommentCard({
  authorName,
  authorProfileImg,
  commentText,
  likeCount,
  publishedAt,
}) {
  return (
    <div className={styles.commentBody}>
      <img
        src={authorProfileImg}
        alt={`Profile of ${authorName}`}
        className={styles.authorAvatar}
      />
      <div className={styles.commentDetails}>
        <span className={styles.authorName}> {authorName} </span>
        <span className={styles.publishedTime}> {publishedAt} </span>
        <p> {commentText} </p>
        <div className={styles.commentReactions}>
          <FiThumbsUp className={styles.thumbsIcon} size={20} />
          <span className={styles.likeCount}>{likeCount}</span>
          <FiThumbsDown className={styles.thumbsIcon} size={20} />
        </div>
      </div>
    </div>
  );
}
