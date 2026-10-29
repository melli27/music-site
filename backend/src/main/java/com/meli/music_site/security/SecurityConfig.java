package com.meli.music_site.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable()) //TODO
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/test",
                                "/auth",
                                "/login",
                                // for swagger:
                                "/api/v1/swagger-ui/**",
                                "/v2/api-docs",
                                "/v3/api-docs",
                                "/v3/api-docs/**",
                                "/swagger-resources",
                                "/swagger-resources/**",
                                "/configuration/ui",
                                "/configuration/security",
                                "/swagger-ui/**",
                                "/webjars/**",
                                "/swagger-ui.html"
                        )
                        .permitAll() // Public endpoints
                        .anyRequest()
                        .authenticated() // Require authentication for other endpoints
                ).oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://127.0.0.1:4200/home", true)
                ).logout(logout -> logout
                        .logoutSuccessUrl("http://127.0.0.1:4200")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll());
        return http.build();
    }
}