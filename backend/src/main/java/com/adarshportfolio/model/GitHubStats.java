package com.adarshportfolio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "github_stats")
@Data
public class GitHubStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int publicRepos;
    private int followers;
    private int following;
    private int totalStars;
    private String avatarUrl;
    private String bio;
    private LocalDateTime lastUpdated;
}
