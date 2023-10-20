const baseURL = "https://youtube.googleapis.com/youtube/v3";
const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

// 검색 쿼리를 기반으로 동영상 목록 회수
export const getSearchVideosConfig = (query, nextPageToken) => ({
  method: "get",
  url: `${baseURL}/search`,
  params: {
    part: "snippet",
    type: "video",
    maxResults: 25,
    q: query,
    ...(nextPageToken ? { pageToken: nextPageToken } : {}),
    key: apiKey,
  },
});

// 특정 지역의 가장 인기 있는 동영상 목록 회수
export const getMostPopularVideosConfig = (regionCode, nextPageToken) => ({
  method: "get",
  url: `${baseURL}/videos`,
  params: {
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    regionCode: regionCode,
    maxResults: 24,
    ...(nextPageToken ? { pageToken: nextPageToken } : {}),
    key: apiKey,
  },
});


/* 동영상 목록 또는 단일 동영상의 세부 정보 회수.
 여러 동영상의 세부 정보 회수는 검색 결과 목록을 보충하기 위해 함께 사용 */
export const getVideoDetailsConfig = (videoIdOrIds) => {
  let ids;
  let parts;

  if (Array.isArray(videoIdOrIds)) {
    ids = videoIdOrIds.join(",");
    parts = "contentDetails,statistics";
  } else {
    ids = videoIdOrIds;
    parts = "snippet,contentDetails,statistics";
  }

  return {
    method: "get",
    url: `${baseURL}/videos`,
    params: {
      part: parts,
      id: ids,
      key: apiKey,
    },
  };
};


/* 채널 목록 또는 단일 채널의 세부 정보 회수.
 여러 채널의 세부 정보 회수는 검색 결과 목록을 보충하기 위해 함께 사용 */
export const getChannelsConfig = (channelIdOrIds) => {
  let ids;
  if (Array.isArray(channelIdOrIds)) {
    ids = channelIdOrIds.join(",");
  } else {
    ids = channelIdOrIds;
  }

  return {
    method: "get",
    url: `${baseURL}/channels`,
    params: {
      part: "snippet,statistics",
      id: ids,
      key: apiKey,
    },
  };
};


// 특정 동영상에 대한 댓글 스레드 회수
export const getCommentThreadsConfig = (videoId, nextPageToken) => ({
  method: "get",
  url: `${baseURL}/commentThreads`,
  params: {
    part: "snippet,replies",
    order: "relevance",
    textFormat: "plainText",
    videoId: videoId,
    ...(nextPageToken ? { pageToken: nextPageToken } : {}),
    key: apiKey,
  },
});


// 특정 최상위 댓글에 달린 첫 10개의 응답 댓글 회수
export const getCommentsConfig = (parentId, nextPageToken) => ({
  method: "get",
  url: `${baseURL}/comments`,
  params: {
    part: "snippet",
    maxResults: 10,
    parentId: parentId,
    textFormat: "plainText",
    ...(nextPageToken ? { pageToken: nextPageToken } : {}),
    key: apiKey,
  },
});
