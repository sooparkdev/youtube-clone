import styles from "./Comment.module.css";
import React, { useState } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export default function Comment({
  comment: {
    commentText,
    authorName,
    authorProfileImg,
    likeCount,
    publishedAt,
    totalReplyCount,
    replies,
  },
}) {
  const [isReplyExpanded, setIsReplyExpanded] = useState(false);

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
        <FiThumbsUp className={styles.thumbsIcon} size={25} />
        <span className={styles.likeCount}>{likeCount}</span>
          <FiThumbsDown className={styles.thumbsIcon} size={25} />
        </div>
        {totalReplyCount > 0 && (
          <button onClick={() => setIsReplyExpanded((prevState) => !prevState)} className={styles.repliesExpandCollapseButton}>
            {isReplyExpanded ? (
              <MdArrowDropUp size={30} />
            ) : (
              <MdArrowDropDown size={30} />
            )}
            {`${totalReplyCount} replies`}
          </button>
        )}
        {isReplyExpanded &&
          replies.map((reply) => <Comment key={reply.id} comment={reply} />)}
      </div>
    </div>
  );
}
