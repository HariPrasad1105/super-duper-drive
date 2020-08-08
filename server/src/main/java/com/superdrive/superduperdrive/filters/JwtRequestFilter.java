package com.superdrive.superduperdrive.filters;

import com.superdrive.superduperdrive.modal.UserProfile;
import com.superdrive.superduperdrive.repository.UserProfileRepository;
import com.superdrive.superduperdrive.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.split(" ")[1];
            username = jwtUtil.extractUserName(jwt);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
             UserProfile userProfile = userProfileRepository.findByUsername(username);

             if (jwtUtil.validateToken(jwt, userProfile)) {
                 UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                         userProfile.getUsername(), null, new ArrayList<>()
                 );
                 token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                 SecurityContextHolder.getContext().setAuthentication(token);
             }
        }

        filterChain.doFilter(request, response);

    }
}
