package com.javalab.board.service;

import com.javalab.board.vo.ItemReview;

import java.util.List;

public interface ItemReviewService {
    List<ItemReview> findById(long itemId);

    ItemReview findByReviewNo(long reviewNo);
}
