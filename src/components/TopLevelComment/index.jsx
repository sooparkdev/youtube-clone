import styles from "./TopLevelComment.module.css";
import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import CommentCard from "../CommentCard";
import ReplyCommentList from "../ReplyCommentList";

export default function TopLevelComment({
  comment: {
    commentId,
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
    <div>
      <CommentCard
        authorName={authorName}
        authorProfileImg={authorProfileImg}
        commentText={commentText}
        likeCount={likeCount}
        publishedAt={publishedAt}
      />
      <div className={styles.repliesWrapper}>
        {totalReplyCount > 0 && (
          <button
            onClick={() => setIsReplyExpanded((prevState) => !prevState)}
            className={`${styles.replyActionBtn} ${styles.toggleRepliesBtn}`}
          >
            {isReplyExpanded ? (
              <MdArrowDropUp size={30} />
            ) : (
              <MdArrowDropDown size={30} />
            )}
            <p>{`답글 ${totalReplyCount}개`}</p>
          </button>
        )}
        <div className={isReplyExpanded ? '' : styles.hidden}>
          <ReplyCommentList
            id={commentId}
            totalReplyCount={totalReplyCount}
            replies={replies}
          />
        </div>
      </div>
    </div>
  );
}
