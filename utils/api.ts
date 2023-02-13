import axios from "axios";
import { SearchResult, VideoResponse } from "../types/invidious";

axios.interceptors.request.use(function (config) {
  /**
   * List of instances
   * https://docs.invidious.io/instances/
   */
  // config.baseURL = "https://invidious.drivet.xyz/";
  config.baseURL = "https://yt.funami.tech/";
  return config;
});
export const getVideoInfo = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Missing query key!");
  }
  const res = await axios<VideoResponse>(
    "/api/v1/videos/" + videoId + "/?fields=recommendedVideos"
  );
  return res.data;
};
export const getSearchResult = async ({
  q,
  page = 0,
  region = "VN",
  type = "video",
  fields = "title,videoId,author,videoThumbnails",
}) => {
  if (!q) {
    throw new Error("Missing params `q`!");
  }
  const res = await axios<SearchResult[]>("/api/v1/search", {
    params: { q, type, page, region, fields },
  });
  return res.data;
};
export const getSkeletonItems = (length: number) =>
  Array.from({ length }).map((_, i) => i);
