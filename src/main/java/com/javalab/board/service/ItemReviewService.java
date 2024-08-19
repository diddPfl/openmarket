package com.javalab.board.service;

import com.javalab.board.dto.ItemReviewDto;

import java.util.List;

public interface ItemReviewService {
    List<ItemReviewDto> findById(long itemId); // ItemReviewDto 리스트 반환

    ItemReviewDto findByReviewNo(long reviewNo); // 단일 ItemReviewDto 반환
}