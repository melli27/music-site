package com.meli.music_site.response_dtos;

import lombok.Data;

import java.util.List;

@Data
public class RecentTracks {
    private String href;
    private int limit;
    private String next;
    private Cursors cursors;
    private int total;
    private List<PlayHistoryItem> items; // List of play history items

    @Data
    public static class Cursors {
        private String after;
        private String before;
    }

}