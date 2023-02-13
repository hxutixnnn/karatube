export interface Image {
  "#text": string;
  size: string;
}

export interface Attr {
  rank: string;
}

export interface Artist {
  name: string;
  url: string;
  streamable: string;
  image: Image[];
  "@attr": Attr;
  mbid: string;
}

export interface Attr2 {
  tag: string;
  page: string;
  perPage: string;
  totalPages: string;
  total: string;
}

export interface Topartists {
  artist: Artist[];
  "@attr": Attr2;
}

export interface LastfmResponse {
  topartists: Topartists;
}
