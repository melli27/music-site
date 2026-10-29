package com.meli.music_site.response_dtos;

import lombok.Data;
import java.util.List;

@Data
public class SpotifyUser {
    private String country;
    private String display_name;
    private String email;
    //private ExplicitContent explicit_content;
    private ExternalUrls external_urls;
    private Followers followers;
    private String href;
    private String id;
    private List<Image> images;
    private String product;
    private String type;
    private String uri;

//    @Data
//    public static class ExplicitContent {
//        private boolean filter_enabled;
//        private boolean filter_locked;
//    }
}