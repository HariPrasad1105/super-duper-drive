package com.superdrive.superduperdrive.repository;

import com.superdrive.superduperdrive.modal.UserCredentails;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserCredentialsRepository extends CrudRepository<UserCredentails, String> {

    List<UserCredentails> findAll();

    UserCredentails findByUsernameAndPassword(String username, String password);

    UserCredentails findByUsername(String username);
}
