package com.superdrive.superduperdrive.repository;

import com.superdrive.superduperdrive.modal.UserProfile;
import org.springframework.data.repository.CrudRepository;

public interface UserProfileRepository extends CrudRepository<UserProfile, String> {
    UserProfile findByUsername(String username);
}
