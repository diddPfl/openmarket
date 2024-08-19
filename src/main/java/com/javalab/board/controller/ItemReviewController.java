package com.javalab.board.controller;

import com.javalab.board.dto.ItemReviewDto;
import com.javalab.board.service.ItemReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/review")
public class ItemReviewController {

    @Autowired
    private ItemReviewService itemReviewService;

    @GetMapping("/{id}")
    public ResponseEntity<List<ItemReviewDto>> getReviewList(@PathVariable("id") long itemId) {
        List<ItemReviewDto> reviews = itemReviewService.findById(itemId);
        return ResponseEntity.ok(reviews); // DTO 리스트 반환
    }

    // 단일 리뷰 조회 엔드포인트 추가
    @GetMapping("/detail/{reviewNo}")
    public ResponseEntity<ItemReviewDto> getReviewDetail(@PathVariable Long reviewNo) {
        ItemReviewDto review = itemReviewService.findByReviewNo(reviewNo);
        if (review != null) {
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.notFound().build(); // 404 반환
        }
    }
}