package com.meli.music_site.response_dtos;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class PlayHistoryItem {
    private Track track; // The track that was played
    @JsonAlias("played_at")
    private String playedAt; // Timestamp when the track was played
    private Context context;

    @Data
    public static class Context {
        private String type;
        private String href;
        private ExternalUrls externalUrls;
        private String uri;
    }
}