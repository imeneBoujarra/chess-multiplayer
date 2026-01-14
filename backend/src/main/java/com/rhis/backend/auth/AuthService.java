package com.rhis.backend.auth;

import com.rhis.backend.user.User;
import com.rhis.backend.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;  // We will use the JwtService for generating tokens

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Register a new user
    public String register(String username, String password) {
        // Check if the user already exists
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new IllegalStateException("Username is already taken");
        }

        // Hash the password before saving it
        String passwordHash = passwordEncoder.encode(password);
        User user = new User(username, passwordHash);

        userRepository.save(user);

        // Generate a JWT token for the user
        return jwtService.generateToken(username);
    }

    // Authenticate an existing user (login)
    public String authenticate(String username, String password) {
        // Find the user by username
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalStateException("User not found"));

        // Check if the password is correct
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalStateException("Invalid password");
        }

        // Generate a JWT token for the authenticated user
        return jwtService.generateToken(username);
    }
}