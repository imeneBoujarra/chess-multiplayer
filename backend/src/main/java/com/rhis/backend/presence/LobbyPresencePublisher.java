package com.rhis.backend.presence;


import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class LobbyPresencePublisher {

    private final PresenceService presenceService;
    private final SimpMessagingTemplate messagingTemplate;

    public LobbyPresencePublisher(
            PresenceService presenceService,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.presenceService = presenceService;
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void onConnect(SessionConnectEvent event) {
        broadcast();
    }

    @EventListener
    public void onDisconnect(SessionDisconnectEvent event) {
        broadcast();
    }

    private void broadcast() {
        messagingTemplate.convertAndSend(
                "/topic/lobby/users",
                presenceService.get_online_usernames()
        );
    }
}

