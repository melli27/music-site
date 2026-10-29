import {ExternalUrls, Followers, Image} from './BaseDtos';

export interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
 //explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}
