package com.adarshportfolio.scraper;

import com.adarshportfolio.model.GitHubStats;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class GitHubScraper {

    private static final Logger log = LoggerFactory.getLogger(GitHubScraper.class);
    private static final String API = "https://api.github.com";

    private final ObjectMapper mapper;
    private final HttpClient   http;

    @Value("${app.github.username}")
    private String username;

    @Value("${app.github.token:}")
    private String token;

    @Autowired
    public GitHubScraper(ObjectMapper mapper) {
        this.mapper = mapper;
        this.http   = HttpClient.newHttpClient();
    }

    public GitHubStats fetchStats() {
        try {
            HttpRequest.Builder rb = HttpRequest.newBuilder()
                    .uri(URI.create(API + "/users/" + username))
                    .header("Accept", "application/vnd.github.v3+json");
            if (!token.isBlank()) rb.header("Authorization", "Bearer " + token);

            HttpResponse<String> res = http.send(rb.build(), HttpResponse.BodyHandlers.ofString());
            if (res.statusCode() != 200) {
                log.warn("GitHub user API returned {}", res.statusCode());
                return null;
            }

            JsonNode user = mapper.readTree(res.body());
            GitHubStats stats = new GitHubStats();
            stats.setPublicRepos(user.path("public_repos").asInt());
            stats.setFollowers(user.path("followers").asInt());
            stats.setFollowing(user.path("following").asInt());
            stats.setAvatarUrl(user.path("avatar_url").asText(""));
            stats.setBio(user.path("bio").asText(""));
            stats.setLastUpdated(LocalDateTime.now());
            return stats;
        } catch (IOException | InterruptedException e) {
            log.error("GitHub stats scrape failed: {}", e.getMessage());
            Thread.currentThread().interrupt();
            return null;
        }
    }

    public List<Map<String, Object>> fetchRepos() {
        List<Map<String, Object>> result = new ArrayList<>();
        try {
            HttpRequest.Builder rb = HttpRequest.newBuilder()
                    .uri(URI.create(API + "/users/" + username + "/repos?sort=stars&per_page=6"))
                    .header("Accept", "application/vnd.github.v3+json");
            if (!token.isBlank()) rb.header("Authorization", "Bearer " + token);

            HttpResponse<String> res = http.send(rb.build(), HttpResponse.BodyHandlers.ofString());
            if (res.statusCode() != 200) return result;

            JsonNode repos = mapper.readTree(res.body());
            for (JsonNode r : repos) {
                result.add(Map.of(
                    "name",        r.path("name").asText(),
                    "description", r.path("description").asText(""),
                    "htmlUrl",     r.path("html_url").asText(),
                    "language",    r.path("language").asText(""),
                    "stars",       r.path("stargazers_count").asInt(),
                    "forks",       r.path("forks_count").asInt()
                ));
            }
        } catch (IOException | InterruptedException e) {
            log.error("GitHub repos scrape failed: {}", e.getMessage());
            Thread.currentThread().interrupt();
        }
        return result;
    }
}
