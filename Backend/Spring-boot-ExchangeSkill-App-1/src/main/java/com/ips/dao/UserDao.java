package com.ips.dao;

import com.ips.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // For authentication [cite: 171]
}