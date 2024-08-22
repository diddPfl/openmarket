package com.javalab.board.service;

import com.javalab.board.vo.Review;
import com.javalab.board.vo.ReviewImage;

import java.util.List;

public interface ReviewService {
    List<ReviewImage> getReviewImages(Long reviewNo);
    void insertReviewImage(ReviewImage reviewImage);
    void deleteReviewImage(Long imageId);
    List<Review> getAllReviews();
}