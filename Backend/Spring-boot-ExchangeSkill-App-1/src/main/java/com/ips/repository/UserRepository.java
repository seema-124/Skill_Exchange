package com.ips.repository;

import com.ips.pojo.User; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findBySkillsToTeachContainingIgnoreCase(String skill);
}