package com.javalab.board.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@Log4j2
@CrossOrigin
public class UpDownController {

    @Value("${com.javalab.boot.upload.path}")
    private String uploadPath;

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable("fileName") String fileName) {
        log.info("Requested image: {}", fileName);
        Path filePath = Paths.get(uploadPath, fileName);
        Resource resource = new FileSystemResource(filePath.toFile());

        if (!resource.exists()) {
            log.warn("Image not found: {}", fileName);
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        try {
            headers.add("Content-Type", Files.probeContentType(filePath));
        } catch (IOException e) {
            log.error("Error determining file type for: {}", fileName, e);
            return ResponseEntity.internalServerError().build();
        }

        log.info("Serving image: {}", fileName);
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    @DeleteMapping("/remove/{fileName}")
    public Map<String,Boolean> removeFile(@PathVariable("fileName") String fileName) {
        log.info("Removing file: {}", fileName);
        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);
        String resourceName = resource.getFilename();

        Map<String, Boolean> resultMap = new HashMap<>();
        boolean removed = false;

        try {
            String contentType = Files.probeContentType(resource.getFile().toPath());
            removed = resource.getFile().delete();

            if(contentType.startsWith("image")){
                File thumbnailFile = new File(uploadPath + File.separator + "s_" + fileName);
                thumbnailFile.delete();
            }
            log.info("File removed: {}, success: {}", fileName, removed);
        } catch (Exception e) {
            log.error("Error removing file: {}", fileName, e);
        }
        resultMap.put("result", removed);
        return resultMap;
    }
}