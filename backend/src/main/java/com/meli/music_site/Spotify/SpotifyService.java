package com.meli.music_site.Spotify;

import com.meli.music_site.response_dtos.Playlist;
import com.meli.music_site.response_dtos.SpotifyUser;
import com.meli.music_site.response_dtos.TopItems;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.RequestEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/*
Makes Api calls to the Spotify Api using the accessToken
Uses RestTemplate to send an HTTP GET request to the Spotify API.
*/

@Service
public class SpotifyService {

    private final RestTemplate restTemplate = new RestTemplate();
    private String baseUrl = "https://api.spotify.com/v1";

    public SpotifyUser getUserData(@NonNull String accessToken) {
        RequestEntity<Void> request = RequestEntity
                .get(UriComponentsBuilder.fromUriString(baseUrl + "/me").build().toUri())
                .headers(headers -> headers.setBearerAuth(accessToken))
                .build();
        return restTemplate.exchange(request, SpotifyUser.class).getBody();
    }

    public TopItems<Playlist> getUserPlaylists(@NonNull String accessToken, int limit, int offset) {
        RequestEntity<Void> request = RequestEntity
                .get(UriComponentsBuilder.fromUriString(baseUrl + "/me/playlists")
                        .queryParam("limit", limit)
                        .queryParam("offset", offset)
                        .build()
                        .toUri())
                .headers(headers -> headers.setBearerAuth(accessToken))
                .build();
        return restTemplate.exchange(request, new ParameterizedTypeReference<TopItems<Playlist>>() {
        }).getBody();
    }
}
