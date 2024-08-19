package com.javalab.board.controller;

import com.javalab.board.dto.FileUploadResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/upload")
public class FileUploadController {

    @Value("${com.javalab.boot.upload.path}")
    private String uploadPath;

    @PostMapping
    public ResponseEntity<List<FileUploadResponseDto>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        List<FileUploadResponseDto> responses = new ArrayList<>();

        for (MultipartFile file : files) {
            String originalFileName = file.getOriginalFilename();
            String uuid = UUID.randomUUID().toString();
            String savedFileName = uuid + "_" + originalFileName;

            try {
                Path filePath = Paths.get(uploadPath, savedFileName);
                Files.createDirectories(filePath.getParent());
                Files.copy(file.getInputStream(), filePath);

                FileUploadResponseDto response = new FileUploadResponseDto(uuid, originalFileName);
                responses.add(response);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().build();
            }
        }

        return ResponseEntity.ok(responses);
    }
}