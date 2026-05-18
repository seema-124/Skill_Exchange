package com.ips.controller;

import com.ips.pojo.Skill;
import com.ips.pojo.User;
import com.ips.dao.SkillDao;
import com.ips.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173")  //For react connection
public class SkillController {

    @Autowired
    private SkillDao skillDao;

    @Autowired
    private UserDao userDao;

    @PostMapping("/add/{userId}")
    public String addSkill(@PathVariable Long userId, @RequestBody Skill skill) {
        return userDao.findById(userId).map(user -> {
            // Check if user is FREE and already has 3 or more skills
            if (!user.isPremium() && skillDao.findByUser(user).size() >= 3) {
                return "Limit Reached: Free users are limited to 3 skills. Please upgrade to Premium!";
            }

            skill.setUser(user);
            skillDao.save(skill);
            return "Skill added successfully!";
        }).orElse("Error: User not found!");
    }
    
    @PutMapping("/upgrade/{userId}")
    public String upgradeUser(@PathVariable Long userId) {
        return userDao.findById(userId).map(user -> {
            user.setPremium(true); // Sets is_premium to 1
            userDao.save(user);
            return "Upgrade Successful!";
        }).orElse("Error: User not found!");
    }
    
    @GetMapping("/user/{userId}")
    public List<Skill> getSkillsByUserId(@PathVariable Long userId) {
        User user = new User();
        user.setUserId(userId);
        return skillDao.findByUser(user);
    }

    @GetMapping("/search")
    public List<Skill> searchPeers(@RequestParam String skill) {
        return skillDao.findBySkillNameContainingIgnoreCase(skill);
    }

    @DeleteMapping("/delete/{skillId}")
    public String deleteSkill(@PathVariable Long skillId) {
        if (skillDao.existsById(skillId)) {
            skillDao.deleteById(skillId);
            return "Skill deleted successfully.";
        }
        return "Error: Skill ID not found.";
    }
}