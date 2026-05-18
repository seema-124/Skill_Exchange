package com.ips.pojo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "availability")
@Data
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long availabilityId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // [cite: 63]

    private String dayOfWeek; // e.g., Monday, Weekend [cite: 89]
    private String timeSlot; // e.g., Morning, Evening [cite: 89]
}