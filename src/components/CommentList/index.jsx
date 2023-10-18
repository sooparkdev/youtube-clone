import styles from "./CommentList.module.css";
import Comment from "../Comment";
import { useState } from "react";
import React from "react";
import { BiMenuAltLeft } from "react-icons/bi";

export default function CommentList({ comments, loading, error }) {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSortByDropdownMenu, setShowSortByDropdownMenu] = useState(false);
  const [currentSortOrder, setCurrentSortOrder] = useState("top comments");

  const handleCancel = () => {
    setIsInputFocused(false);
    setInputValue("");
  };

  if (loading) return <div>Loading Comments...</div>; // chanage this to showing a spinner instead
  if (error)
    return <div>Sorry, there has been an error. Please try again.</div>; // try again이라고 하면 user가 refresh하고 결국엔 refetch 하게 되나?

  return (
    <div className={styles.container}>
      <div className={styles.commentsHeader}>
        <p>{`${comments.length} comments`}</p>
        <button
          onClick={() => setShowSortByDropdownMenu((prevState) => !prevState)}
        >
          <BiMenuAltLeft /> Sort by
        </button>
        {showSortByDropdownMenu && (
          <div className={styles.sortingBtns}>
            <button
              onClick={() => {
                setCurrentSortOrder("top comments");
              }}
              // className={`topBtn ${currentSortOrder === "top comments" ? styles.selectedSortOption : ""}`}
              className={currentSortOrder === "top comments" && styles.selectedSortOption}
            >
              Top comments
            </button>
            <button
              onClick={() => {
                setCurrentSortOrder("newest first");
              }}
              // className={`newBtn ${currentSortOrder === "newest first" ? styles.selectedSortOption : ""}`}
              className={currentSortOrder === "newest first" && styles.selectedSortOption}

            >
              Newest first
            </button>
          </div>
        )}
      </div>
      <div className={styles.commentEntry}>
        <input
          type="text"
          value={inputValue}
          placeholder="Add a comment..."
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onFocus={() => {
            setIsInputFocused(true);
          }}
        />
        {isInputFocused && (
          <div className={styles.commentActions}>
            <button onClick={handleCancel} className={styles.cancelBtn}>
              Cancel
            </button>
            <button
              disabled={!inputValue}
              onClick={() => {}}
              className={styles.submitBtn}
            >
              Comment
            </button>
          </div>
        )}
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
