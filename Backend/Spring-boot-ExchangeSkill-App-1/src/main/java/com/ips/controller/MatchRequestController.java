package com.ips.controller;

import com.ips.pojo.MatchRequest;
import com.ips.pojo.User;
import com.ips.dao.MatchRequestDao;
import com.ips.dao.UserDao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/requests") 
@CrossOrigin(origins = "http://localhost:5173")
public class MatchRequestController {

    @Autowired
    private MatchRequestDao requestDao;

    @Autowired
    private UserDao userDao;

    @PostMapping("/send")
    public ResponseEntity<String> sendRequest(@RequestParam Long senderId, @RequestParam Long receiverId) {
        // 1. Check if users exist
        User sender = userDao.findById(senderId).orElse(null);
        User receiver = userDao.findById(receiverId).orElse(null);

        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().body("Error: User not found!");
        }

        // 2. Prevent duplicates if a request already exists between these two users
        List<MatchRequest> existing = requestDao.findByReceiverAndStatus(receiver, "Pending");
        boolean alreadySent = existing.stream().anyMatch(r -> r.getSender().getUserId().equals(senderId));
        
        if (alreadySent) {
            return ResponseEntity.badRequest().body("Error: Request already sent!");
        }

        // 3. Save new request
        MatchRequest request = new MatchRequest();
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus("Pending");

        requestDao.save(request);
        return ResponseEntity.ok("Success: Match request sent!");
    }
    
    @PutMapping("/update/{requestId}")
    public ResponseEntity<String> updateRequestStatus(@PathVariable Long requestId, @RequestParam String status) {
        MatchRequest request = requestDao.findById(requestId).orElse(null);
        if (request != null) {
            request.setStatus(status);
            requestDao.save(request);
            return ResponseEntity.ok("Status updated to " + status);
        }
        return ResponseEntity.badRequest().body("Error: Request not found!");
    }
    
    @GetMapping("/pending/{userId}")
    public List<MatchRequest> getPendingRequests(@PathVariable Long userId) {
        User receiver = userDao.findById(userId).orElse(null);
        if (receiver == null) return null;
        return requestDao.findByReceiverAndStatus(receiver, "Pending");
    }

    @GetMapping("/accepted/{userId}")
    public List<MatchRequest> getAcceptedMatches(@PathVariable Long userId) {
        return requestDao.findAcceptedMatches(userId);
    }
}