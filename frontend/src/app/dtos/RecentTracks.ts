import {Cursors, PlayHistoryItem} from './BaseDtos';

export interface RecentTracks {
  href: string;
  limit: number;
  next: string;
  cursors: Cursors;
  total: number;
  items: PlayHistoryItem[]; // Array of play history items
}
