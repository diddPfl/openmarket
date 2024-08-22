package com.javalab.board.service;

import com.javalab.board.repository.ReviewRepository;
import com.javalab.board.vo.Review;
import com.javalab.board.vo.ReviewImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<ReviewImage> getReviewImages(Long reviewNo) {
        return reviewRepository.getReviewImages(reviewNo);
    }

    @Override
    public void insertReviewImage(ReviewImage reviewImage) {
        reviewRepository.insertReviewImage(reviewImage);
    }

    @Override
    public void deleteReviewImage(Long imageId) {
        reviewRepository.deleteReviewImage(imageId);
    }

    @Override
    public List<Review> getAllReviews() {
        // For now, let's return a hardcoded list of reviews
        List<Review> reviews = new ArrayList<>();
        reviews.add(new Review("Product 1", "Great product!"));
        reviews.add(new Review("Product 2", "Could be better."));
        return reviews;
    }
}