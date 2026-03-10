package com.adarshportfolio.controller;

import com.adarshportfolio.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final FileService fileService;

    @GetMapping("/download")
    public ResponseEntity<Resource> download(@RequestParam(defaultValue = "false") boolean inline) throws IOException {
        Path p = fileService.getResumePath();
        if (p == null) return ResponseEntity.notFound().build();

        ContentDisposition cd = inline
                ? ContentDisposition.inline().filename("Adarsh_R_Resume.pdf").build()
                : ContentDisposition.attachment().filename("Adarsh_R_Resume.pdf").build();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, cd.toString())
                .body(new PathResource(p));
    }
}
