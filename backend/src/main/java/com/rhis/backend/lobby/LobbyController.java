package com.rhis.backend.lobby;

import com.rhis.backend.dto.InviteRequest;
import com.rhis.backend.dto.InviteResponse;
import com.rhis.backend.game.Game;
import com.rhis.backend.game.GameService;
import com.rhis.backend.presence.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class LobbyController {

    @Autowired
    GameService gameService ;

    private final SimpMessagingTemplate messagingTemplate;
    private final PresenceService presenceService;

    public LobbyController(
            SimpMessagingTemplate messagingTemplate,
            PresenceService presenceService
    ) {
        this.messagingTemplate = messagingTemplate;
        this.presenceService = presenceService;
    }

    // Send invite
    @MessageMapping("/lobby/invite")
    public void invite(InviteRequest request, Principal principal) {
        if (principal == null) return;

        String from = principal.getName();
        String to = request.to();

        if (!presenceService.is_online(to)) {
            return; // user offline, ignore
        }

        messagingTemplate.convertAndSendToUser(
                to,
                "/queue/invites",
                from
        );
    }

    // Accept / decline invite
    @MessageMapping("/lobby/invite/response")
    public void respond(InviteResponse response, Principal principal) {
        if (principal == null || !response.accept()) return;

        String accepter = principal.getName();
        String inviter = response.from();

        Game game = gameService.createGame(inviter, accepter);

        messagingTemplate.convertAndSendToUser(
                inviter,
                "/queue/game-start",
                game.getId()
        );

        messagingTemplate.convertAndSendToUser(
                accepter,
                "/queue/game-start",
                game.getId()
        );
    }
}