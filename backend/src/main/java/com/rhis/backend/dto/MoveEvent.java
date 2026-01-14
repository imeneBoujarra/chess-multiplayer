package com.rhis.backend.dto;


import java.util.UUID;

public record MoveEvent(
        UUID gameId,
        String from,
        String to,
        String fen,
        String playedBy
) {}

