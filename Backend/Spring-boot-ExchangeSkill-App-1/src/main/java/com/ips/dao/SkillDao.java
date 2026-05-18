package com.ips.dao;

import com.ips.pojo.Skill;
import com.ips.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillDao extends JpaRepository<Skill, Long> {
    // Finds skills (and their owners) based on a keyword like "Java" or "Python"
    List<Skill> findBySkillNameContainingIgnoreCase(String skillName);
    
    // Finds all skills belonging to a specific user
    List<Skill> findByUser(User user);
}