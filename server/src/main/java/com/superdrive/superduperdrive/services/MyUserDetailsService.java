package com.superdrive.superduperdrive.services;

import com.superdrive.superduperdrive.modal.UserCredentails;
import com.superdrive.superduperdrive.repository.UserCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserCredentialsRepository userCredentialsRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserCredentails userCredentails = userCredentialsRepository.findByUsername(username);

        return (UserDetails) userCredentails;
    }
}
