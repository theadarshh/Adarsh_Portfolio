package com.adarshportfolio.repository;

import com.adarshportfolio.model.LeetCodeStats;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LeetCodeStatsRepository extends JpaRepository<LeetCodeStats, Long> {
    Optional<LeetCodeStats> findTopByOrderByLastUpdatedDesc();
}
