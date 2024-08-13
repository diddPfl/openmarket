package com.javalab.board.controller;

import com.javalab.board.service.ItemReviewService;
import com.javalab.board.vo.ItemReview;
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
    public ResponseEntity<List<ItemReview>> getReviewList(@PathVariable("id") long itemId) {
        List<ItemReview> reviews = itemReviewService.findById(itemId);
        return ResponseEntity.ok(reviews);    // 200 OK와 함께 리뷰 목록 반환
    }
}