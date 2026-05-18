package com.ips.dao;

import com.ips.pojo.Chat;
import com.ips.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatDao extends JpaRepository<Chat, Long> {
    List<Chat> findBySenderAndReceiverOrderByTimestampAsc(User sender, User receiver); // For real-time interaction [cite: 109]
}