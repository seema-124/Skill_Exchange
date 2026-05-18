package com.ips.controller;

import com.ips.dao.MatchRequestDao;
import com.ips.pojo.User;
import com.ips.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // allow React Frontend
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MatchRequestDao requestDao;
    
    @GetMapping("/search")
    public List<User> searchExperts(@RequestParam String skill, @RequestParam Long currentUserId) {
        // Fetch users matching the skill
        return userRepository.findBySkillsToTeachContainingIgnoreCase(skill)
                .stream()
                .filter(user -> !user.getUserId().equals(currentUserId))
                .collect(Collectors.toList());
    }
    @PutMapping("/update/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setName(updatedUser.getName());
        user.setSkillsToTeach(updatedUser.getSkillsToTeach());
        user.setSkillsToLearn(updatedUser.getSkillsToLearn());
        return userRepository.save(user);
    }
    @GetMapping("/stats/demand")
    public List<Map<String, Object>> getSkillDemand() {
        // This logic counts how many users want to learn each skill
        List<User> allUsers = userRepository.findAll();
        Map<String, Integer> demandMap = new HashMap<>();

        for (User u : allUsers) {
            if (u.getSkillsToLearn() != null) {
                String[] skills = u.getSkillsToLearn().split(",");
                for (String s : skills) {
                    String trimmed = s.trim().toUpperCase();
                    demandMap.put(trimmed, demandMap.getOrDefault(trimmed, 0) + 1);
                }
            }
        }

        // Convert map to a list of top 3 for the UI
        return demandMap.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .limit(3)
            .map(entry -> {
                Map<String, Object> map = new HashMap<>();
                map.put("skill", entry.getKey());
                // Fake a percentage for the UI based on total users (e.g., 5/10 users = 50%)
                int percentage = (entry.getValue() * 100) / Math.max(allUsers.size(), 1);
                map.put("percentage", Math.min(percentage + 40, 99)); // Adding offset so it looks high
                return map;
            })
            .collect(Collectors.toList());
    }
    @GetMapping("/stats/community")
    public Map<String, Long> getCommunityStats() {
        Map<String, Long> stats = new HashMap<>();
        
        // 1. Count all registered users
        stats.put("totalUsers", userRepository.count());
        
        // 2. Count all match requests ever sent
        stats.put("totalSwaps", requestDao.count());
        
        // 3. Count only currently "Accepted" matches (Active Rooms)
        // You might need to add a countByStatus method in your MatchRequestDao
        stats.put("activeRooms", requestDao.countByStatus("Accepted"));
        
        return stats;
    }
}