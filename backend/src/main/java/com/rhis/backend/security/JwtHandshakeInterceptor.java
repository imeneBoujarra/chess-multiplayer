package com.rhis.backend.security;
import com.rhis.backend.auth.JwtService;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwt_service;

    public JwtHandshakeInterceptor(JwtService jwtService) {
        this.jwt_service = jwtService;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {
        try {
            var params = UriComponentsBuilder.fromUri(request.getURI()).build().getQueryParams();
            var tokens = params.get("token");

            if (tokens == null || tokens.isEmpty()) {
                return false;
            }

            String token = tokens.get(0);
            String username = jwt_service.extractUsername(token);

            attributes.put("username", username);
            return true;
        } catch (Exception ex) {

             return false;
        }
    }

    @Override
    public void afterHandshake(
            @NonNull ServerHttpRequest request,
            @NonNull ServerHttpResponse response,
            @NonNull WebSocketHandler wsHandler,
            Exception exception
    ) {
        // no-op
    }
}