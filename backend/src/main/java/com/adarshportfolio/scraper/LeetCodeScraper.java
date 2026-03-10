package com.adarshportfolio.scraper;

import com.adarshportfolio.model.LeetCodeStats;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;

@Component
public class LeetCodeScraper {

    private static final Logger log = LoggerFactory.getLogger(LeetCodeScraper.class);
    private static final String GRAPHQL = "https://leetcode.com/graphql";

    private final ObjectMapper mapper;
    private final HttpClient   http;

    @Value("${app.leetcode.username}")
    private String username;

    @Autowired
    public LeetCodeScraper(ObjectMapper mapper) {
        this.mapper = mapper;
        this.http   = HttpClient.newHttpClient();
    }

    public LeetCodeStats fetchStats() {
        String query = """
            {
              "query": "query getUserProfile($username: String!) { matchedUser(username: $username) { submitStats: submitStatsGlobal { acSubmissionNum { difficulty count } } } allQuestionsCount { difficulty count } }",
              "variables": { "username": "%s" }
            }
            """.formatted(username);

        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(GRAPHQL))
                    .header("Content-Type", "application/json")
                    .header("Referer", "https://leetcode.com")
                    .POST(HttpRequest.BodyPublishers.ofString(query))
                    .build();

            HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());

            if (res.statusCode() != 200) {
                log.warn("LeetCode API returned {}", res.statusCode());
                return null;
            }

            return parseResponse(res.body());
        } catch (IOException | InterruptedException e) {
            log.error("LeetCode scrape failed: {}", e.getMessage());
            Thread.currentThread().interrupt();
            return null;
        }
    }

    private LeetCodeStats parseResponse(String json) throws IOException {
        JsonNode root = mapper.readTree(json);
        JsonNode data = root.path("data");

        // All question counts
        JsonNode allQ   = data.path("allQuestionsCount");
        int easyTotal   = 0, mediumTotal = 0, hardTotal = 0;
        for (JsonNode q : allQ) {
            String diff = q.path("difficulty").asText();
            int count   = q.path("count").asInt();
            if ("Easy".equals(diff))   easyTotal   = count;
            if ("Medium".equals(diff)) mediumTotal = count;
            if ("Hard".equals(diff))   hardTotal   = count;
        }

        // Solved counts
        JsonNode acSub = data.path("matchedUser")
                             .path("submitStats")
                             .path("acSubmissionNum");
        int easySolved = 0, mediumSolved = 0, hardSolved = 0, totalSolved = 0;
        for (JsonNode s : acSub) {
            String diff = s.path("difficulty").asText();
            int count   = s.path("count").asInt();
            if ("All".equals(diff))    totalSolved  = count;
            if ("Easy".equals(diff))   easySolved   = count;
            if ("Medium".equals(diff)) mediumSolved = count;
            if ("Hard".equals(diff))   hardSolved   = count;
        }

        LeetCodeStats stats = new LeetCodeStats();
        stats.setTotalSolved(totalSolved);
        stats.setEasySolved(easySolved);
        stats.setMediumSolved(mediumSolved);
        stats.setHardSolved(hardSolved);
        stats.setEasyTotal(easyTotal);
        stats.setMediumTotal(mediumTotal);
        stats.setHardTotal(hardTotal);
        stats.setLastUpdated(LocalDateTime.now());
        return stats;
    }
}
