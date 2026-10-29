import {Track} from './Track';

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Cursors {
  after: string;
  before: string;
}

export interface PlayHistoryItem {
  // Define the structure of PlayHistoryItem here
  // For example:
  track: Track;
  playedAt: string;
  context: Context;
}

export interface Context {
  // Define the structure of Context here
  type: string;
  href: string;
  externalUrls: ExternalUrls;
}
