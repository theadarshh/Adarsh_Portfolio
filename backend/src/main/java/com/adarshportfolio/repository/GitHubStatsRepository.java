package com.adarshportfolio.repository;

import com.adarshportfolio.model.GitHubStats;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GitHubStatsRepository extends JpaRepository<GitHubStats, Long> {
    Optional<GitHubStats> findTopByOrderByLastUpdatedDesc();
}
