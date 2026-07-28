package com.tarea.crud.config;

import com.tarea.crud.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login", "/api/auth/registro").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/productos/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/categorias/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/productos/**").hasAuthority("SUPER-ADMIN-ROLE")
                        .requestMatchers(HttpMethod.PUT, "/api/productos/**").hasAuthority("SUPER-ADMIN-ROLE")
                        .requestMatchers(HttpMethod.DELETE, "/api/productos/**").hasAuthority("SUPER-ADMIN-ROLE")
                        .requestMatchers(HttpMethod.POST, "/api/categorias/**").hasAuthority("SUPER-ADMIN-ROLE")
                        .requestMatchers(HttpMethod.PUT, "/api/categorias/**").hasAuthority("SUPER-ADMIN-ROLE")
                        .requestMatchers(HttpMethod.DELETE, "/api/categorias/**").hasAuthority("SUPER-ADMIN-ROLE")
                        .requestMatchers(HttpMethod.GET, "/api/usuarios/**").hasAuthority("SUPER-ADMIN-ROLE")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}