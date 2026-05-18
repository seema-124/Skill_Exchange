package com.ips.pojo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "compatibility_scores")
@Data
public class CompatibilityScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scoreId; // [cite: 126]

    @ManyToOne
    @JoinColumn(name = "user1_id")
    private User user1; // [cite: 126]

    @ManyToOne
    @JoinColumn(name = "user2_id")
    private User user2; // [cite: 126]

    private float score; // Percentage value (0-100%) [cite: 99, 126]
}