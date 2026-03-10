package com.adarshportfolio.controller;

import com.adarshportfolio.model.LeetCodeStats;
import com.adarshportfolio.service.LeetCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leetcode")
@RequiredArgsConstructor
public class LeetCodeController {

    private final LeetCodeService service;

    @GetMapping("/latest")
    public ResponseEntity<LeetCodeStats> latest() {
        return ResponseEntity.ok(service.getLatest());
    }

    @PostMapping("/refresh")
    public ResponseEntity<LeetCodeStats> refresh() {
        return ResponseEntity.ok(service.refresh());
    }
}
