package com.meli.music_site.response_dtos;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

import java.util.List;

@Data
public class Playlist {
    private String id;
    private String name;
    private String description;
    private List<Image> images;
    private ExternalUrls external_urls;
    private Owner owner;
    // Spotify renamed "tracks" to "items" on playlist objects; accept both.
    @JsonAlias({"tracks", "items"})
    private TracksRef tracks;
    private String uri;

    @Data
    public static class Owner {
        private String id;
        private String display_name;
    }

    @Data
    public static class TracksRef {
        private String href;
        private int total;
    }
}
