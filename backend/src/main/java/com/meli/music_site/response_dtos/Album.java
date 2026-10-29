package com.meli.music_site.response_dtos;


import lombok.Data;

import java.util.List;

@Data
public class Album {
    private String albumType;
    private int totalTracks;
    private List<String> availableMarkets;
    private ExternalUrls externalUrls;
    private String href;
    private String id;
    private List<Image> images;
    private String name;
    private String releaseDate;
    private String releaseDatePrecision;
    // Restrictions restrictions;
    private String type;
    private String uri;
    private List<Artist> artists;
    private Track[] tracks;
    //private List<Copyright> copyrights;
    //private ExternalIds externalIds;
    private List<String> genres;
    private String label;
    private int popularity;
}