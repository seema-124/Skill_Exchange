package com.ips.pojo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String password;
    private String bio;
    private boolean isPremium = false;
    private String skillsToTeach;
    private String skillsToLearn;
}