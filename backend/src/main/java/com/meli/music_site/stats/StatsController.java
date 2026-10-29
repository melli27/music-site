package com.meli.music_site.stats;

import com.meli.music_site.response_dtos.Artist;
import com.meli.music_site.response_dtos.RecentTracks;
import com.meli.music_site.response_dtos.TopItems;
import com.meli.music_site.response_dtos.Track;
import com.meli.music_site.security.AccessTokens;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/top-artists")
    public TopItems<Artist> topArtists(@RegisteredOAuth2AuthorizedClient("spotify") OAuth2AuthorizedClient oAuth2AuthorizedClient,
                                       @RequestParam(name = "limit", defaultValue = "10", required = false) int limit,
                                       @RequestParam(name = "offset", defaultValue = "0", required = false) int offsetIndex,
                                       @RequestParam TimeRange timeRange)
    {
        return statsService.getTopArtists(AccessTokens.of(oAuth2AuthorizedClient), timeRange, limit, offsetIndex);
    }

    @GetMapping("/top-tracks")
    public TopItems<Track> topTracks(@RegisteredOAuth2AuthorizedClient("spotify") OAuth2AuthorizedClient oAuth2AuthorizedClient,
                                     @RequestParam(name = "limit", defaultValue = "10", required = false) int limit,
                                     @RequestParam(name = "offset", defaultValue = "0", required = false) int offsetIndex,
                                     @RequestParam TimeRange timeRange)
    {
        return statsService.getTopTracks(AccessTokens.of(oAuth2AuthorizedClient), timeRange, limit, offsetIndex);
    }

    //TODO either after or before
    @GetMapping("/recent-tracks")
    public RecentTracks recentTracks(@RegisteredOAuth2AuthorizedClient("spotify") OAuth2AuthorizedClient oAuth2AuthorizedClient,
                                            @RequestParam(name = "limit", defaultValue = "10", required = false) int limit,
                                            @RequestParam(name = "after", defaultValue = "0", required = false) long after,
                                            @RequestParam(name = "before", defaultValue = "0", required = false) long before)
    {
        return statsService.getRecentTracks(AccessTokens.of(oAuth2AuthorizedClient), limit, after, before);
    }

}