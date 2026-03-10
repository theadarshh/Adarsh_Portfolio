package com.adarshportfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Service
public class FileService {

    private static final Logger log = LoggerFactory.getLogger(FileService.class);

    @Value("${app.upload.dir}")
    private String uploadDir;

    public Path storeProfileImage(MultipartFile file) throws IOException {
        Path dir = Paths.get(uploadDir);
        Files.createDirectories(dir);
        String ext = getExt(file.getOriginalFilename());
        Path target = dir.resolve("profile." + ext);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        log.info("Profile image saved to {}", target);
        return target;
    }

    public Path getProfileImagePath() {
        Path dir = Paths.get(uploadDir);
        for (String ext : new String[]{"jpg","jpeg","png","webp"}) {
            Path p = dir.resolve("profile." + ext);
            if (Files.exists(p)) return p;
        }
        return null;
    }

    public Path getResumePath() {
        Path dir = Paths.get(uploadDir);
        Path p = dir.resolve("resume.pdf");
        return Files.exists(p) ? p : null;
    }

    private String getExt(String filename) {
        if (filename == null || !filename.contains(".")) return "jpg";
        return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    }
}
