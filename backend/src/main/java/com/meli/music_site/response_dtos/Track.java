package com.meli.music_site.response_dtos;

import lombok.Data;
import java.util.List;

@Data
public class Track {
    private Album album;
    private List<Artist> artists;
    private List<String> availableMarkets;
    private int discNumber;
    private int durationMs;
    private boolean explicit;
    private ExternalIds external_ids;
    private ExternalUrls external_urls;
    private String href;
    private String id;
    private boolean isPlayable;
    //private LinkedFrom linkedFrom;
    //private Restrictions restrictions;
    private String name;
    private int popularity;
    private String previewUrl;
    private int trackNumber;
    private String type;
    private String uri;
    private boolean isLocal;

    //private List<String> artistGenres;
    private String artistGenre;
}