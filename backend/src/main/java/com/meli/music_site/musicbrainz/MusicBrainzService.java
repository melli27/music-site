package com.meli.music_site.musicbrainz;

import com.google.common.util.concurrent.RateLimiter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MusicBrainzService {

    private final RestTemplate restTemplate = new RestTemplate();
    // Allow 5 request per second
    private final RateLimiter rateLimiter = RateLimiter.create(1.0); //TODO only allows 1 per second

    public String searchArtist(String artistName) {
        rateLimiter.acquire(); // Ensures we don’t exceed the limit
        String url = "https://musicbrainz.org/ws/2/artist/?query=artist:" + artistName + "&fmt=json&limit=1";
        return restTemplate.getForObject(url, String.class);
    }

    public String getArtistGenres(String artistMBID) {
        rateLimiter.acquire();
        String url = "https://musicbrainz.org/ws/2/artist/" + artistMBID + "?inc=genres&fmt=json";
        return restTemplate.getForObject(url, String.class);
    }
}