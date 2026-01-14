package com.rhis.backend.dto;

import java.util.UUID;

public record MoveRequest(
        UUID gameId,
        String from,
        String to
) {}