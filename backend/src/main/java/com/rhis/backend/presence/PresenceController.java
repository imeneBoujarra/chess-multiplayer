package com.rhis.backend.presence;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class PresenceController {

    private final PresenceService presence_service;
    private final SimpMessagingTemplate messaging_template;

    public PresenceController(PresenceService presenceService, SimpMessagingTemplate messagingTemplate) {
        this.presence_service = presenceService;
        this.messaging_template = messagingTemplate;
    }

    @MessageMapping("/presence.connect")
    public void connect(Principal principal) {
        if (principal == null) {
            return;
        }

        String username = principal.getName();
        presence_service.mark_online(username);
        messaging_template.convertAndSend("/topic/presence", presence_service.get_online_users());
    }

    @MessageMapping("/presence.disconnect")
    public void disconnect(Principal principal) {
        if (principal == null) {
            return;
        }

        String username = principal.getName();
        presence_service.mark_offline(username);
        messaging_template.convertAndSend("/topic/presence", presence_service.get_online_users());
    }
}
