package com.javalab.board.repository;

import com.javalab.board.vo.ItemReview;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ItemReviewRepository {
    // id로 리뷰 조회
    List<ItemReview> findById(long itemId);

    // reviewNo로 단일 리뷰 조회
    ItemReview findByReviewNo(long reviewNo);
}
