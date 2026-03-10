package com.adarshportfolio.service;

import com.adarshportfolio.model.GitHubStats;
import com.adarshportfolio.repository.GitHubStatsRepository;
import com.adarshportfolio.scraper.GitHubScraper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GitHubService {

    private static final Logger log = LoggerFactory.getLogger(GitHubService.class);

    private final GitHubScraper         scraper;
    private final GitHubStatsRepository repo;

    public GitHubStats getLatest() {
        return repo.findTopByOrderByLastUpdatedDesc()
                   .orElseGet(this::refresh);
    }

    public GitHubStats refresh() {
        GitHubStats fetched = scraper.fetchStats();
        if (fetched != null) return repo.save(fetched);
        log.warn("GitHub scrape returned null — returning cached or empty");
        return repo.findTopByOrderByLastUpdatedDesc().orElse(new GitHubStats());
    }

    public List<Map<String, Object>> getRepos() {
        return scraper.fetchRepos();
    }
}
