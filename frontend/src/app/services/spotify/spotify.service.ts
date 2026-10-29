import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SpotifyUser} from '../../dtos/SpotifyUser';
import {TopItems} from '../../dtos/TopItems';
import {Playlist} from '../../dtos/Playlist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  profile: SpotifyUser = {

    country: '',
    display_name: '',
    email: '',
    /*    explicit_content: {
          filter_enabled: false,
          filter_locked: false
        },*/
    external_urls: {
      spotify: ''
    },
    followers: {
      href: '',
      total: 0
    },
    href: '',
    id: '',
    images: [],
    product: '',
    type: '',
    uri: ''

  }

  constructor(private http: HttpClient) {
  }

  userProfile() {
    return this.http.get('http://127.0.0.1:8080/api/v1/user-profile', {withCredentials: true});
  }

  getPlaylists(limit: number, offset: number = 0) {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.http.get<TopItems<Playlist>>('http://127.0.0.1:8080/api/v1/playlists', {
      params: params,
      withCredentials: true
    });
  }

  loadProfile() {
    this.userProfile().subscribe({
      next: (user) => {
        this.profile = user as SpotifyUser;
        console.log('User Profile:', this.profile);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getProfile() {
    return this.profile;
  }
}
