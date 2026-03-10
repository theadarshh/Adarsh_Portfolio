package com.adarshportfolio.service;

import com.adarshportfolio.model.LeetCodeStats;
import com.adarshportfolio.repository.LeetCodeStatsRepository;
import com.adarshportfolio.scraper.LeetCodeScraper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeetCodeService {

    private static final Logger log = LoggerFactory.getLogger(LeetCodeService.class);

    private final LeetCodeScraper         scraper;
    private final LeetCodeStatsRepository repo;

    public LeetCodeStats getLatest() {
        return repo.findTopByOrderByLastUpdatedDesc()
                   .orElseGet(this::refresh);
    }

    public LeetCodeStats refresh() {
        LeetCodeStats fetched = scraper.fetchStats();
        if (fetched != null) {
            return repo.save(fetched);
        }
        log.warn("LeetCode scrape returned null — returning cached or empty stats");
        return repo.findTopByOrderByLastUpdatedDesc().orElse(new LeetCodeStats());
    }
}
