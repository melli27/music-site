package com.meli.music_site.security;

import org.springframework.lang.NonNull;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;

public final class AccessTokens {

    private AccessTokens() {
    }

    // Returns the access token value, failing fast if Spring Security didn't provide one.
    @NonNull
    public static String of(OAuth2AuthorizedClient client) {
        String token = client.getAccessToken().getTokenValue();
        if (token == null) {
            throw new IllegalStateException("Missing OAuth2 access token");
        }
        return token;
    }
}
