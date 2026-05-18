package com.ips.dao;

import com.ips.pojo.Availability;
import com.ips.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvailabilityDao extends JpaRepository<Availability, Long> {
    List<Availability> findByUser(User user); // To check available time slots [cite: 89]
}