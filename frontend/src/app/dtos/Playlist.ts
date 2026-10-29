import {ExternalUrls, Image} from './BaseDtos';

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: Image[] | null;
  external_urls: ExternalUrls;
  owner: { id: string; display_name: string };
  tracks: { href: string; total: number } | null;
  uri: string;
}
