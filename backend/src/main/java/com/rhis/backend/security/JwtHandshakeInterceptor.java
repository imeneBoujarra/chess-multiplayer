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

@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwt_service;

    public JwtHandshakeInterceptor(JwtService jwtService) {
        this.jwt_service = jwtService;
    }

    @Override
    public boolean beforeHandshake(
            @NonNull ServerHttpRequest request,
            @NonNull ServerHttpResponse response,
            @NonNull WebSocketHandler wsHandler,
            @NonNull Map<String, Object> attributes
    ) {
        Map<String, List<String>> params = UriComponentsBuilder.fromUri(request.getURI()).build().getQueryParams();
        List<String> token_list = params.get("token");

        if (token_list == null || token_list.isEmpty()) {
            return false;
        }

        String token = token_list.get(0);
        String username = jwt_service.extractUsername(token);

        attributes.put("username", username);
        return true;
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