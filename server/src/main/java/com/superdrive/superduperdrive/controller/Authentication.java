package com.superdrive.superduperdrive.controller;

import com.superdrive.superduperdrive.modal.UserCredentails;
import com.superdrive.superduperdrive.modal.UserProfile;
import com.superdrive.superduperdrive.repository.UserCredentialsRepository;
import com.superdrive.superduperdrive.repository.UserProfileRepository;
import com.superdrive.superduperdrive.utils.AuthenticationResponse;
import com.superdrive.superduperdrive.utils.JWTUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Authentication {

    @Autowired
    UserCredentialsRepository userCredentialsRepository;

    @Autowired
    JWTUtil jwtUtil;

    @Autowired
    UserProfileRepository userProfileRepository;

    Logger logger = LoggerFactory.getLogger(Authentication.class);

    @PostMapping("/login")
    private ResponseEntity<?> validateLogin(@RequestBody UserCredentails userCredentails) {
        String username = userCredentails.getUsername();
        String password = userCredentails.getPassword();

        UserCredentails credentials = userCredentialsRepository.findByUsernameAndPassword(username, password);
        logger.debug("testing" + credentials.getUsername());

        if (credentials == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        UserProfile userProfile = userProfileRepository.findByUsername(username);

        final String jwt = jwtUtil.generateToken(userProfile);

        return new ResponseEntity<>(new AuthenticationResponse(jwt), HttpStatus.OK);
    }

    @GetMapping("/user-profile")
    public UserProfile getUserName(@RequestParam(value = "token") String token) {
        String username = jwtUtil.extractUserName(token);

        return userProfileRepository.findByUsername(username);
    }
}
