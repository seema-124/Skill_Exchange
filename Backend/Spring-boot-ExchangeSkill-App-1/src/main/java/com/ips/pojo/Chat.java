package com.ips.pojo;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "chats")
@Data
public class Chat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;
    @ManyToOne @JoinColumn(name = "sender_id")
    private User sender;
    @ManyToOne @JoinColumn(name = "receiver_id")
    private User receiver;
    @Column(columnDefinition = "TEXT")
    private String content;
    private LocalDateTime timestamp = LocalDateTime.now();
}
