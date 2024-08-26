package com.javalab.board.repository;

import com.javalab.board.vo.ReviewImage;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
@Mapper
@Repository
public interface ItemReviewImageRepository {
        List<ReviewImage> findByReviewId(long reviewId);
    }
