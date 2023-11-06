import styles from "./TopLevelCommentList.module.css";
import TopLevelComment from "../TopLevelComment";
import React from "react";
import Spinner from "../Spinner";
import ErrorPage from "../../pages/ErrorPage";
import NoResultsPage from "../../pages/NoResultsPage";

export default function TopLevelCommentList({ commentList, loading, error }) {

  if(error) {
    if(error.response.data.error.errors.some(item => item.reason === "commentsDisabled")) {
      return <NoResultsPage mainMessage="이 비디오에 관련된 댓글 기능이 비활성화되었습니다." description="이용에 불편을 드려 죄송합니다." />
    }

    return <ErrorPage mainMessage="죄송합니다. 댓글을 불러오는 중에 오류가 발생했습니다."/>;
  }

  return (
    <div className={styles.wrapper}>
      {commentList && <div className={styles.commentsHeader}>
        <p className={styles.commentCount}>{`댓글 ${commentList?.length}개`}</p>
      </div>}
      {commentList?.map((comment) => (
        <TopLevelComment key={comment.commentId} comment={comment} />
      ))}
      {loading && <Spinner />}
    </div>
  );
}
