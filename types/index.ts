import { RecommendedVideo, SearchResult } from "./invidious";

export type PlaylistItem = (SearchResult | RecommendedVideo) & {
  key: string;
};
