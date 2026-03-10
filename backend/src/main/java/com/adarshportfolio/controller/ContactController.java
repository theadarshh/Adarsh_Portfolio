package com.adarshportfolio.controller;

import com.adarshportfolio.dto.ContactRequest;
import com.adarshportfolio.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService service;

    @PostMapping
    public ResponseEntity<Map<String, String>> contact(@Valid @RequestBody ContactRequest req) {
        service.handleContact(req);
        return ResponseEntity.ok(Map.of("message", "Message received. Thank you!"));
    }
}
