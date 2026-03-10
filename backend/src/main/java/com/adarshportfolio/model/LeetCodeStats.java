package com.adarshportfolio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "leetcode_stats")
@Data
public class LeetCodeStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalSolved;
    private int easySolved;
    private int mediumSolved;
    private int hardSolved;
    private int easyTotal;
    private int mediumTotal;
    private int hardTotal;
    private int ranking;
    private LocalDateTime lastUpdated;
}
