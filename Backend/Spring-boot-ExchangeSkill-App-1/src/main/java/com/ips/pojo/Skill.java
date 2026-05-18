package com.ips.pojo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "skills")
@Data
public class Skill {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;
    private String skillName;
    private String experienceLevel; 
    @ManyToOne 
    @JoinColumn(name = "user_id")
    private User user;
}
