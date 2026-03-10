package com.adarshportfolio.controller;

import com.adarshportfolio.model.GitHubStats;
import com.adarshportfolio.service.GitHubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/github")
@RequiredArgsConstructor
public class GitHubController {

    private final GitHubService service;

    @GetMapping("/latest")
    public ResponseEntity<GitHubStats> latest() {
        return ResponseEntity.ok(service.getLatest());
    }

    @GetMapping("/repos")
    public ResponseEntity<List<Map<String, Object>>> repos() {
        return ResponseEntity.ok(service.getRepos());
    }

    @PostMapping("/refresh")
    public ResponseEntity<GitHubStats> refresh() {
        return ResponseEntity.ok(service.refresh());
    }
}
