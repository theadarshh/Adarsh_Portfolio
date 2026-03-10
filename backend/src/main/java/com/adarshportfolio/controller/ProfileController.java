package com.adarshportfolio.controller;

import com.adarshportfolio.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final FileService fileService;

    @GetMapping("/image")
    public ResponseEntity<byte[]> getImage() throws IOException {
        Path p = fileService.getProfileImagePath();
        if (p == null) return ResponseEntity.notFound().build();
        byte[] bytes = Files.readAllBytes(p);
        String ct = Files.probeContentType(p);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(ct != null ? ct : "image/jpeg"))
                .body(bytes);
    }

    @PostMapping("/image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        fileService.storeProfileImage(file);
        return ResponseEntity.ok(Map.of("message", "Profile image uploaded successfully"));
    }
}
