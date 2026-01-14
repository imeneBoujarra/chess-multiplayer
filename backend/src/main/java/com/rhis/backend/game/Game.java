package com.rhis.backend.game;


import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "games")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "white_player", nullable = false)
    private String whitePlayer;

    @Column(name = "black_player", nullable = false)
    private String blackPlayer;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GameStatus status;

    @Column(nullable = false, length = 100)
    private String fen;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
}
