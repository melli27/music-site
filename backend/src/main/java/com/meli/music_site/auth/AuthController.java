package com.meli.music_site.auth;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/auth")
    public boolean checkAuthentication(Authentication authentication) {
        return authentication != null && authentication.isAuthenticated();
    }
}
