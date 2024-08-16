package com.javalab.board.service;

import com.javalab.board.repository.ItemReviewRepository;
import com.javalab.board.vo.ItemReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemReviewServiceImpl implements ItemReviewService{

    @Autowired
    private ItemReviewRepository itemReviewRepository;

    @Override
    public List<ItemReview> findById(long itemId) {
        return itemReviewRepository.findById(itemId);
    }

    @Override
    public ItemReview findByReviewNo(long reviewNo) {
        return itemReviewRepository.findByReviewNo(reviewNo);
    }

}
