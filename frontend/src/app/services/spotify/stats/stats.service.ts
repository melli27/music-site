import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TimeRange} from '../../../dtos/TimeRange';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) {
  }

  getTopArtists(limit: number, offset: number, timeRange: TimeRange) {
    const params = new HttpParams()
      .set('timeRange', timeRange)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get('http://127.0.0.1:8080/api/v1/stats/top-artists', {
      params: params,
      withCredentials: true
    });
  }

  getTopTracks(limit: number, offset: number, timeRange: TimeRange) {
    const params = new HttpParams()
      .set('timeRange', timeRange)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get('http://127.0.0.1:8080/api/v1/stats/top-tracks', {
      params: params,
      withCredentials: true
    });
  }

  getRecentTracks(limit: number, after: number, before: number) {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('after', after.toString())
      .set('before', before.toString());

    return this.http.get('http://127.0.0.1:8080/api/v1/stats/recent-tracks', {
      params: params,
      withCredentials: true
    });
  }

  searchArtistOnMusicBrainz(artistName: string) {
    return this.http.get('http://127.0.0.1:8080/api/v1/musicbrainz/artist/' + artistName, {
      withCredentials: true
    })
  }

  getArtistGenres(id: string) {
    return this.http.get('http://127.0.0.1:8080/api/v1/musicbrainz/artist/' + id + '/genres', {
      withCredentials: true
    });
  }

  // // TODO
  // searchTrackOnMusicBrainz(trackName: string, artistName: string) {
  //   const url = `https://musicbrainz.org/ws/2/recording?query="${trackName}"%20AND%20artist:${encodeURIComponent(artistName)}&fmt=json&limit=5`;
  //   return this.http.get(url);
  // }
  // searchArtistOnMusicBrainz(artistName: string) {
  //   const url = `https://musicbrainz.org/ws/2/artist/?query=artist:${artistName}&fmt=json&limit=1`;
  //   return this.http.get(url);
  // }
  //
  // searchOnMusicBrainz(irsc: string) {
  //   const url = `https://musicbrainz.org/ws/2/isrc/${encodeURIComponent(irsc)}?&fmt=json`;
  //   return this.http.get(url);
  // }
  //
  //
  // getArtistGenres(artistMBID: string) {
  //   const url = `https://musicbrainz.org/ws/2/artist/${encodeURIComponent(artistMBID)}?inc=genres&fmt=json`;
  //   return this.http.get(url);
  // }
  //
  // getGenre(trackId: string) {
  //   const url = `https://musicbrainz.org/ws/2/recording/${encodeURIComponent(trackId)}?inc=genres&fmt=json`;
  //   return this.http.get(url);
  // }
}
