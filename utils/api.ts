import axios from "axios";
import { GetArtists, GetTopics } from "../types";
import { SearchResult, VideoResponse } from "../types/invidious";

const invidious = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INVIDIOUS_URL,
});

export const getVideoInfo = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Missing query key!");
  }
  const res = await invidious.get<VideoResponse>(
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
  const res = await invidious.get<SearchResult[]>("/api/v1/search", {
    params: { q, type, page, region, fields },
  });
  return res.data;
};
export const getSkeletonItems = (length: number) =>
  Array.from({ length }).map((_, i) => i);

export const getArtists = async (gender: number = 1) => {
  const res = await axios.get<GetArtists>("/api/artists/" + gender);
  return res.data;
};

export const getTopics = async () => {
  const res = await axios.get<GetTopics>("/api/topics");
  return res.data;
};
