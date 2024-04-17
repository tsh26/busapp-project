package com.bus_tracker.backend.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("bookmark")
public class BookMark implements Serializable {
    // Getters and Setters
    private Long id;
    private String userId; // Instead of a User object, you may choose to store just the user ID
    private String name;
}
