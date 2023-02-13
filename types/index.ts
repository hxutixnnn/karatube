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

export interface Topic {
  title: string;
  key: string;
  backgroundColor: string;
  description: string;
  coverImageURL: string;
  thumbURL: string;
}

export interface TopicCover {
  title: string;
  key: string;
  backgroundColor: string;
  description: string;
  coverImageURL: string;
  thumbURL: string;
}

export interface GetTopics {
  status: string;
  topic: Topic[];
  topicCover: TopicCover[];
  clientIp: string;
  time: number;
}
