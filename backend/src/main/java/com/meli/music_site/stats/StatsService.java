package com.meli.music_site.stats;

import com.meli.music_site.response_dtos.*;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.RequestEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class StatsService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String SPOTIFY_API_URL = "https://api.spotify.com/v1/";

    private <T> T fetchData(@NonNull String token, @NonNull ParameterizedTypeReference<T> responseType,
            UriComponentsBuilder builder) {
        RequestEntity<Void> request = RequestEntity.get(builder.build().toUri())
                .headers(headers -> headers.setBearerAuth(token))
                .build();
        return restTemplate.exchange(request, responseType).getBody();
    }

    public TopItems<Artist> getTopArtists(@NonNull String token, TimeRange timeRange, int limit, int offsetIndex) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(SPOTIFY_API_URL + "me/top/artists")
                .queryParam("time_range", timeRange.toString())
                .queryParam("limit", limit)
                .queryParam("offset", offsetIndex);
        return fetchData(token, new ParameterizedTypeReference<TopItems<Artist>>() {
        }, builder);
    }

    public TopItems<Track> getTopTracks(@NonNull String token, TimeRange timeRange, int limit, int offsetIndex) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(SPOTIFY_API_URL + "me/top/tracks")
                .queryParam("time_range", timeRange.toString())
                .queryParam("limit", limit)
                .queryParam("offset", offsetIndex);
        // for (Track track : topTracks.getItems()) {
        // HashSet<String> genres = new HashSet<>();
        // //for(Artist artist: track.getArtists()) {
        // //TODO not only first artists genre is added
        // //track.setArtistGenres(getArtistGenres(token,
        // track.getArtists().getFirst().getId()));
        // setArtistGenre(token, track, track.getArtists().getFirst().getId());
        // }
        return fetchData(token, new ParameterizedTypeReference<>() {
        }, builder);
    }

    private void setArtistGenre(@NonNull String token, Track track, String artistId) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(SPOTIFY_API_URL + "artists/" + artistId);
        Artist artist = fetchData(token, new ParameterizedTypeReference<>() {
        }, builder);
        if (!artist.getGenres().isEmpty()) {
            track.setArtistGenre(artist.getGenres().getFirst());
        }
    }

    public RecentTracks getRecentTracks(@NonNull String token, int limit, long after, long before) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(SPOTIFY_API_URL + "me/player/recently-played")
                .queryParam("limit", limit);
        // Spotify allows only one cursor. Without one it returns the newest plays
        // first.
        // "after" pages forward from that time, so after=0 would return the oldest
        // plays.
        if (after > 0) {
            builder.queryParam("after", after);
        } else if (before > 0) {
            builder.queryParam("before", before);
        }
        return fetchData(token, new ParameterizedTypeReference<>() {
        }, builder);
    }
}