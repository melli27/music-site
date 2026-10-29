package com.meli.music_site.response_dtos;

import lombok.Data;

import java.util.List;

@Data
public class TopItems<T> {
    private String href;
    private int limit;
    private String next;
    private int offset;
    private String previous;
    private int total;
    private List<T> items;
}
