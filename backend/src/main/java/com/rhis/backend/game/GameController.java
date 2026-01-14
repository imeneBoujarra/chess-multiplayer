package com.rhis.backend.game;




import com.rhis.backend.dto.MoveEvent;
import com.rhis.backend.dto.MoveRequest;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class GameController {

    private final GameService gameService;
    private final SimpMessagingTemplate messagingTemplate;

    public GameController(GameService gameService,
                          SimpMessagingTemplate messagingTemplate) {
        this.gameService = gameService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/game.move")
    public void move(MoveRequest request, Principal principal) {
        if (principal == null) return;

        MoveEvent event = gameService.handleMove(
                request,
                principal.getName()
        );

        messagingTemplate.convertAndSend(
                "/topic/game." + request.gameId(),
                event
        );
    }
}

