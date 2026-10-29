package com.meli.music_site.musicbrainz;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/musicbrainz")
public class MusicBrainzController {

    private final MusicBrainzService musicBrainzService;

    public MusicBrainzController(MusicBrainzService musicBrainzService) {
        this.musicBrainzService = musicBrainzService;
    }

    @GetMapping("/artist/{artistName}")
    public String searchArtist(@PathVariable String artistName) {
        return musicBrainzService.searchArtist(artistName);
    }

    @GetMapping("/artist/{mbid}/genres")
    public String getArtistGenres(@PathVariable String mbid) {
        return musicBrainzService.getArtistGenres(mbid);
    }
}