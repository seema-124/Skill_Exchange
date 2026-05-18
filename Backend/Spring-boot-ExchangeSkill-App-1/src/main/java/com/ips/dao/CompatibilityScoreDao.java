package com.ips.dao;

import com.ips.pojo.CompatibilityScore;
import com.ips.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompatibilityScoreDao extends JpaRepository<CompatibilityScore, Long> {
    CompatibilityScore findByUser1AndUser2(User u1, User u2); // For smart matching accuracy [cite: 186]
}