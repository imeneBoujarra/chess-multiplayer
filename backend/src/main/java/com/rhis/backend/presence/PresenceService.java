package com.rhis.backend.presence;

import com.rhis.backend.dto.OnlineUserDto;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class PresenceService {

    private final Set<String> online_usernames = ConcurrentHashMap.newKeySet();

    public void mark_online(String username) {
        online_usernames.add(username);
    }

    public void mark_offline(String username) {
        online_usernames.remove(username);
    }

    public Set<OnlineUserDto> get_online_users() {
        return online_usernames.stream()
                .sorted()
                .map(OnlineUserDto::new)
                .collect(Collectors.toUnmodifiableSet());
    }

    public boolean is_online(String username) {
        return online_usernames.contains(username);
    }
}