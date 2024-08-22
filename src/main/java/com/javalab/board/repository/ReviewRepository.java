package com.javalab.board.repository;

import com.javalab.board.vo.Review;
import com.javalab.board.vo.ReviewImage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewRepository {
    List<ReviewImage> getReviewImages(Long reviewNo);
    void insertReviewImage(ReviewImage reviewImage);
    void deleteReviewImage(Long imageId);
    List<Review> getAllReviews();
}