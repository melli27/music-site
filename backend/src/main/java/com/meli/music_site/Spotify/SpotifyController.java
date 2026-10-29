package com.meli.music_site.Spotify;

import com.meli.music_site.response_dtos.Playlist;
import com.meli.music_site.response_dtos.SpotifyUser;
import com.meli.music_site.response_dtos.TopItems;
import com.meli.music_site.security.AccessTokens;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;

/*
Handles HttpRequests coming from frontend
calls the SpotifyService.ts to fetch the playlists
and returns the result.
*/

@RestController
@Slf4j
public class SpotifyController {

    private final SpotifyService spotifyService;

    public SpotifyController(SpotifyService spotifyService) {
        this.spotifyService = spotifyService;
    }

    @GetMapping("/user-profile")
    public SpotifyUser getUserProfile(@RegisteredOAuth2AuthorizedClient("spotify") OAuth2AuthorizedClient authorizedClient) {
        String accessToken = AccessTokens.of(authorizedClient);
        return spotifyService.getUserData(accessToken);
    }

    @GetMapping("/playlists")
    public TopItems<Playlist> getUserPlaylists(@RegisteredOAuth2AuthorizedClient("spotify") OAuth2AuthorizedClient authorizedClient,
                                               @RequestParam(name = "limit", defaultValue = "20", required = false) int limit,
                                               @RequestParam(name = "offset", defaultValue = "0", required = false) int offset) {
        return spotifyService.getUserPlaylists(AccessTokens.of(authorizedClient), limit, offset);
    }
}
