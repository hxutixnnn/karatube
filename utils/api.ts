import axios from "axios";
import { SearchResult, VideoResponse } from "../types/invidious";
import { LastfmResponse } from "../types/lastfm";

const invidious = axios.create({
  baseURL: "https://yt.funami.tech/",
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

export const getArtists = async () => {
  const res = await axios.get<LastfmResponse>("/", {
    baseURL: "https://ws.audioscrobbler.com/2.0/",
    params: {
      method: "tag.gettopartists",
      tag: "vietnamese",
      api_key: "b25b959554ed76058ac220b7b2e0a026",
      format: "json",
    },
  });
  return res.data;
};
