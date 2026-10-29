package com.meli.music_site.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(name = "Meli", email = "melanieschiebel@gmx.at"),
                description = "OpenApi documentation for Spring Security with Spotify OAuth2",
                title = "OpenApi Specifications",
                version = "1.0"
        ),
        servers = {
                @Server(description = "Local ENV", url = "http://127.0.0.1:8080/api/v1"), // Update port if necessary
                @Server(description = "PROD ENV", url = "https://meli.com")
        },
        security = {@SecurityRequirement(name = "oauth2")} // Use "oauth2" as the security requirement
)
@SecurityScheme(
        name = "oauth2", // Name of the security scheme
        description = "OAuth2 authentication with Spotify",
        type = SecuritySchemeType.OAUTH2, // Use OAUTH2 type
        flows = @io.swagger.v3.oas.annotations.security.OAuthFlows(
                authorizationCode = @io.swagger.v3.oas.annotations.security.OAuthFlow(
                        authorizationUrl = "https://accounts.spotify.com/authorize", // Spotify authorization URL
                        tokenUrl = "https://accounts.spotify.com/api/token", // Spotify token URL
                        scopes = {
                                @io.swagger.v3.oas.annotations.security.OAuthScope(name = "user-read-private", description = "Read access to user's private information"),
                                @io.swagger.v3.oas.annotations.security.OAuthScope(name = "user-read-email", description = "Read access to user's email address")
                        }
                )
        ),
        in = SecuritySchemeIn.HEADER // OAuth2 token is passed in the header
)
public class OpenApiConfig {
}