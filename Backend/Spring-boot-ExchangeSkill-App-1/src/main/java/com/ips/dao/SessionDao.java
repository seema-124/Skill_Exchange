package com.ips.dao;

import com.ips.pojo.Session;
import com.ips.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SessionDao extends JpaRepository<Session, Long> {
    List<Session> findByUser1OrUser2(User u1, User u2); // For session management [cite: 91]
}