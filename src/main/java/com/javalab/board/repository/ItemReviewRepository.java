package com.javalab.board.repository;

import com.javalab.board.vo.ItemReview;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ItemReviewRepository {
    // 아이템 ID로 리뷰 조회
    List<ItemReview> findById(long itemId);

    // 리뷰 번호로 단일 리뷰 조회
    ItemReview findByReviewNo(long reviewNo);
}