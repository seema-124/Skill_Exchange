package com.ips.pojo;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
@Data
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId; // [cite: 126]

    @ManyToOne
    @JoinColumn(name = "user1_id")
    private User user1; //

    @ManyToOne
    @JoinColumn(name = "user2_id")
    private User user2; //

    private String meetingLink; // Google Meet or Zoom link [cite: 107]
    
    private LocalDateTime scheduledTime; // [cite: 126]
    
    private String sessionStatus; // e.g., Scheduled, Completed, Cancelled
}