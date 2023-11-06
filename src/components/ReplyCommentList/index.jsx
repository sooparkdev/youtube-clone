import styles from "./ReplyCommentList.module.css";
import React, { useState, useEffect } from "react";
import CommentCard from "../CommentCard";
import ErrorPage from "../../pages/ErrorPage";
import Spinner from "../Spinner";
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import usePaginatedFetchAndNormalize from "../../hooks/usePaginatedFetchAndNormalize";
import { getCommentsConfig } from "../../utils/getYoutubeApiConfigs";

export default function ReplyCommentList({ id, totalReplyCount, replies = []}) {
  const [commentId, setCommentId] = useState(null);
  const [loadMoreReplies, setLoadMoreReplies] = useState(false);
  const [totalReplies, setTotalReplies] = useState(null);

  const {
    results: singlePageReplies,
    loading: repliesLoading,
    error: repliesError,
  } = usePaginatedFetchAndNormalize(
    getCommentsConfig,
    commentId,
    loadMoreReplies
  );

  useEffect(() => {
    if (singlePageReplies) {
      setLoadMoreReplies(false);
      setTotalReplies((prev) => [...(prev || []), ...singlePageReplies]);
    }
  }, [singlePageReplies]);

  const handleLoadMoreReplies = () => {
    setCommentId(id);
    setLoadMoreReplies(true);
  };

  if (repliesError) {
    return (
      <ErrorPage mainMessage="죄송합니다. 답글을 불러오는 중에 오류가 발생했습니다." />
    );
  }

  return (
    <>
      {(totalReplies || replies)?.map(
        ({
          commentId,
          authorName,
          authorProfileImg,
          commentText,
          likeCount,
          publishedAt,
        }) => (
          <CommentCard
            key={commentId}
            authorName={authorName}
            authorProfileImg={authorProfileImg}
            commentText={commentText}
            likeCount={likeCount}
            publishedAt={publishedAt}
          />
        )
      )}
      {!repliesLoading &&
        totalReplyCount > (totalReplies || replies)?.length && (
          <button
            onClick={handleLoadMoreReplies}
            className={`${styles.replyActionBtn} ${styles.loadMoreRepliesBtn}`}
          >
            <PiArrowElbowDownRightBold />
            <p>답글 더보기</p>
          </button>
        )}
      {repliesLoading && <Spinner />}
    </>
  );
}
