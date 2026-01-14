package com.rhis.backend.game;



import com.rhis.backend.dto.MoveEvent;
import com.rhis.backend.dto.MoveRequest;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Random;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final Random random = new Random();

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game createGame(String playerA, String playerB) {
        boolean aIsWhite = random.nextBoolean();

        Game game = Game.builder()
                .whitePlayer(aIsWhite ? playerA : playerB)
                .blackPlayer(aIsWhite ? playerB : playerA)
                .status(GameStatus.ACTIVE)
                .fen(ChessConstants.INITIAL_FEN)
                .createdAt(OffsetDateTime.now())
                .build();

        return gameRepository.save(game);
    }

    public MoveEvent handleMove(MoveRequest request, String username) {

        Game game = gameRepository.findById(request.gameId())
                .orElseThrow(() -> new IllegalStateException("Game not found"));

        validatePlayer(game, username);
        validateTurn(game, username);

        // ⛔ Placeholder: no real chess rules yet
        String newFen = game.getFen(); // will be replaced later

        game.setFen(newFen);
        gameRepository.save(game);

        return new MoveEvent(
                game.getId(),
                request.from(),
                request.to(),
                newFen,
                username
        );
    }

    private void validatePlayer(Game game, String username) {
        if (!username.equals(game.getWhitePlayer()) &&
                !username.equals(game.getBlackPlayer())) {
            throw new IllegalStateException("Not your game");
        }
    }

    private void validateTurn(Game game, String username) {
        boolean whiteTurn = game.getFen().contains(" w ");
        if (whiteTurn && !username.equals(game.getWhitePlayer())) {
            throw new IllegalStateException("Not your turn");
        }
        if (!whiteTurn && !username.equals(game.getBlackPlayer())) {
            throw new IllegalStateException("Not your turn");
        }
    }
}
