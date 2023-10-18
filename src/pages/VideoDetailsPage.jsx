import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router";
import { normalizeRawData } from "../utils/normalizeYoutubeRawData";
import mockCommentThreads from "../mock/mockCommentThreads.json";
import { getCommentsConfig } from "../utils/getYoutubeApiConfigs";
import CommentList from "../components/CommentList";
import VideoShowcase from "../components/VideoShowcase";

export default function VideoDetailsPage() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [videoId, setVideoId] = useState("");

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   setVideoId(queryParams.get("v"));
  // }, [location.search]);

  // if (!videoId) {
  //   //redirect to default page
  //   navigate(`/`);
  // }

  // const config = getCommentsConfig(videoId);
  // const {
  //   rawData,
  //   loading: loadingComments,
  //   error: errorComments,
  // } = useFetch(config);
  // const comments = normalizeData(rawData.kind, rawData);

  const transformedData = normalizeRawData(
    mockCommentThreads.kind,
    mockCommentThreads.items
  );

  return (
    <>
      <VideoShowcase />
      {/* 
      <CommentList comments={comments} loading={loadingComments} error={errorComments}/> */}
      <CommentList comments={transformedData} loading={false} error={false} />
    </>
  );
}
