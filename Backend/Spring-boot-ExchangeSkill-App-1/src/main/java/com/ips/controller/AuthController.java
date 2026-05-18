package com.ips.controller;

import com.ips.pojo.User;
import com.ips.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Connects React app 
public class AuthController {

    @Autowired
    private UserDao userDao;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        // Validation for unique email
        if(userDao.findByEmail(user.getEmail()).isPresent()) {
            return "Error: Email is already registered!";
        }
        
        // Initializing user with default values (Free tier by default)
        user.setPremium(false); 
        userDao.save(user);
        return "Registration Successful!";
    }

    @PostMapping("/login")
    public Object loginUser(@RequestBody User user) {
        Optional<User> existingUser = userDao.findByEmail(user.getEmail());
        
        // Basic authentication check
        if(existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            // Returns user details
            return existingUser.get(); 
        }
        return "Invalid Credentials!";
    }
    
    @PostMapping("/google-login")
    public User googleLogin(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String name = data.get("name");

        Optional<User> existingUser = userDao.findByEmail(email);
        
        if (existingUser.isEmpty()) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setPassword("GOOGLE_AUTH"); 
            newUser.setPremium(false);
            return userDao.save(newUser);
        }
        
        return existingUser.get(); 
    }
    
    @PutMapping("/update-profile")
    public User updateProfile(@RequestBody User updatedUser) {
        return userDao.findById(updatedUser.getUserId()).map(user -> {
            user.setSkillsToTeach(updatedUser.getSkillsToTeach());
            user.setSkillsToLearn(updatedUser.getSkillsToLearn());
            user.setBio(updatedUser.getBio());
            return userDao.save(user);
        }).orElse(null);
    }
}