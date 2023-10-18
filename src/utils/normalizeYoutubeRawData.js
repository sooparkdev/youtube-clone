// =========
// Imports
// =========
import { formatDateToTimeAgo } from "./dateConversions";
import { formatDuration } from "./durationConversions";
import { formatNumberWithUnit } from "./numberFormatter";
import compose from "./functionUtils";

// ========================
// Text Processing Utilities
// ========================
function decodeHTMLEntities(text) {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

function brToNewline(input) {
  return input.replace(/<br\s*\/?>/gi, "\n");
}

const processTextContent = compose(brToNewline, decodeHTMLEntities);

// =============
// Transformers
// =============

// Common fields transformer for responses from /search and /video endpoints
const extractVideoDetails = (item) => ({
  title: processTextContent(item.snippet.title),
  description: processTextContent(item.snippet.description),
  publishedAt: formatDateToTimeAgo(item.snippet.publishedAt),
  channelId: item.snippet.channelId,
  channelTitle: processTextContent(item.snippet.channelTitle),
  thumbnails: item.snippet.thumbnails,
});

// Search list transformer
const transformSearchList = (rawItemList) => {
  return rawItemList.map((item) => ({
    ...extractVideoDetails(item),
    videoId: item.id.videoId,
  }));
};

// Most popular list transformer
const transformVideoList = (rawItemList) => {
  return rawItemList.map((item) => {
    const snippetDetails = item.snippet ? extractVideoDetails(item) : {};

    return {
      ...snippetDetails,
      videoId: item.id,
      duration: formatDuration(item.contentDetails?.duration),
      viewCount: formatNumberWithUnit(item.statistics?.viewCount),
      likeCount: item.statistics?.likeCount,
    };
  });
};

// Comments transformer
const processSingleComment = (comment) => ({
  commentText: processTextContent(comment.snippet.textDisplay),
  authorName: processTextContent(comment.snippet.authorDisplayName),
  authorProfileImg: comment.snippet.authorProfileImageUrl,
  likeCount: comment.snippet.likeCount,
  publishedAt: formatDateToTimeAgo(comment.snippet.publishedAt),
});

const transformCommentThreadsList = (rawItemList) => {
  return rawItemList.map((commentItem) => {
    const topLevelComment = processSingleComment(
      commentItem.snippet.topLevelComment
    );
    const replies = commentItem.replies?.comments.map(processSingleComment);

    return {
      id: commentItem.id,
      ...topLevelComment,
      totalReplyCount: commentItem.snippet.totalReplyCount,
      ...(replies ? { replies } : {}),
    };
  });
};

const transformCommentsList = (rawItemList) => {
  return rawItemList.map(processSingleComment);
};

// Channel transformer
const transformChannelResponse = (rawItemList) => {
  return rawItemList.map((item) => ({
    channelId: item.id,
    channelThumbnails: item.snippet.thumbnails,
    subscriberCount: item.statistics.subscriberCount,
    hiddenSubscriberCount: item.statistics.hiddenSubscriberCount,
  }));
};

// ========================
// Main Normalizer Function
// ========================
export const normalizeRawData = (kind, rawItemList) => {
  if (!Array.isArray(rawItemList)) {
    return [];
  }

  switch (kind) {
    case "youtube#searchListResponse":
      return transformSearchList(rawItemList);
    case "youtube#videoListResponse":
      return transformVideoList(rawItemList);
    case "youtube#channelListResponse":
      return transformChannelResponse(rawItemList);
    case "youtube#commentThreadListResponse":
      return transformCommentThreadsList(rawItemList);
    case "youtube#commentListResponse":
      return transformCommentsList(rawItemList);
    default:
      return [];
  }
};
