import { RecommendedVideo, SearchResult } from "./invidious";

export type PlaylistItem = (SearchResult | RecommendedVideo) & {
  key: number;
};

export interface Artist {
  artistId: number;
  name: string;
  shortLink: string;
  imageUrl: string;
}

export interface GetArtists {
  status: string;
  artist: Artist[];
  clientIp: string;
  time: number;
}
