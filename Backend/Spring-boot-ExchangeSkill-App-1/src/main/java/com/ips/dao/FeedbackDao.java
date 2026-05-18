package com.ips.dao;

import com.ips.pojo.Feedback;
import com.ips.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackDao extends JpaRepository<Feedback, Long> {
    List<Feedback> findByToUser(User toUser); // To calculate profile rating [cite: 94, 95]
}