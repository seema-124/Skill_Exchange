package com.ips.dao;

import com.ips.pojo.MatchRequest;
import com.ips.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MatchRequestDao extends JpaRepository<MatchRequest, Long> {
    
    List<MatchRequest> findByReceiverAndStatus(User receiver, String status);

    @Query("SELECT m FROM MatchRequest m WHERE (m.sender.userId = :uid OR m.receiver.userId = :uid) AND m.status = 'Accepted'")
    List<MatchRequest> findAcceptedMatches(@Param("uid") Long userId);
    long countByStatus(String status);
}