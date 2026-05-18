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
@Table(name = "match_requests")
@Data 
public class MatchRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;
    @ManyToOne @JoinColumn(name = "sender_id", insertable = false, updatable = false)
    private User sender;
    @ManyToOne @JoinColumn(name = "receiver_id", insertable = false, updatable = false )
    private User receiver;
    private String status = "Pending";
}
