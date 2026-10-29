package com.meli.music_site.response_dtos;

import lombok.Data;

@Data
public class ExternalIds {
    private String isrc;
    private String ean;
    private String upc;
}
