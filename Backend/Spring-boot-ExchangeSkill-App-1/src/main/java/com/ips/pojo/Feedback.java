package com.ips.pojo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "feedback")
@Data
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @ManyToOne
    @JoinColumn(name = "from_user_id")
    private User fromUser; // The person giving the rating [cite: 96]

    @ManyToOne
    @JoinColumn(name = "to_user_id")
    private User toUser; // The person being rated [cite: 96]

    private int rating; // 1 to 5 stars [cite: 94]
    
    @Column(columnDefinition = "TEXT")
    private String comment; // [cite: 95]
}