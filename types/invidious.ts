export interface VideoThumbnail {
  quality: string;
  url: string;
  width: number;
  height: number;
}

export interface Storyboard {
  url: string;
  templateUrl: string;
  width: number;
  height: number;
  count: number;
  interval: number;
  storyboardWidth: number;
  storyboardHeight: number;
  storyboardCount: number;
}

export interface AuthorThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface ColorInfo {
  primaries: string;
  transferCharacteristics: string;
  matrixCoefficients: string;
}

export interface AdaptiveFormat {
  init: string;
  index: string;
  bitrate: string;
  url: string;
  itag: string;
  type: string;
  clen: string;
  lmt: string;
  projectionType: string;
  fps: number;
  container: string;
  encoding: string;
  audioQuality: string;
  audioSampleRate: number;
  audioChannels: number;
  resolution: string;
  qualityLabel: string;
  colorInfo: ColorInfo;
}

export interface FormatStream {
  url: string;
  itag: string;
  type: string;
  quality: string;
  fps: number;
  container: string;
  encoding: string;
  resolution: string;
  qualityLabel: string;
  size: string;
}

export interface RecommendedVideo {
  videoId: string;
  title: string;
  videoThumbnails: VideoThumbnail[];
  author: string;
  authorUrl: string;
  authorId: string;
  lengthSeconds: number;
  viewCountText: string;
  viewCount: number;
}

export interface VideoResponse {
  type: string;
  title: string;
  videoId: string;
  videoThumbnails: VideoThumbnail[];
  storyboards: Storyboard[];
  description: string;
  descriptionHtml: string;
  published: number;
  publishedText: string;
  keywords: string[];
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  paid: boolean;
  premium: boolean;
  isFamilyFriendly: boolean;
  allowedRegions: string[];
  genre: string;
  genreUrl: string;
  author: string;
  authorId: string;
  authorUrl: string;
  authorThumbnails: AuthorThumbnail[];
  subCountText: string;
  lengthSeconds: number;
  allowRatings: boolean;
  rating: number;
  isListed: boolean;
  liveNow: boolean;
  isUpcoming: boolean;
  dashUrl: string;
  adaptiveFormats: AdaptiveFormat[];
  formatStreams: FormatStream[];
  captions: any[];
  recommendedVideos: RecommendedVideo[];
}

export interface SearchResult {
  type: string;
  title: string;
  videoId: string;
  author: string;
  authorId: string;
  authorUrl: string;
  videoThumbnails: VideoThumbnail[];
  description: string;
  descriptionHtml: string;
  viewCount: number;
  published: number;
  publishedText: string;
  lengthSeconds: number;
  liveNow: boolean;
  premium: boolean;
  isUpcoming: boolean;
}
