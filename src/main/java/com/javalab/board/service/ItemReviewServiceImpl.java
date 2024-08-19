package com.javalab.board.service;

import com.javalab.board.dto.*;
import com.javalab.board.repository.ItemReviewRepository;
import com.javalab.board.vo.ItemReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemReviewServiceImpl implements ItemReviewService {

    @Autowired
    private ItemReviewRepository itemReviewRepository;

    @Override
    public List<ItemReviewDto> findById(long itemId) {
        List<ItemReview> reviews = itemReviewRepository.findById(itemId);
        return reviews.stream()
                .map(this::convertToDto) // ItemReview를 ItemReviewDto로 변환
                .collect(Collectors.toList());
    }

    @Override
    public ItemReviewDto findByReviewNo(long reviewNo) {
        ItemReview itemReview = itemReviewRepository.findByReviewNo(reviewNo);
        return convertToDto(itemReview);  // 단일 ItemReview를 ItemReviewDto로 변환
    }

    // ItemReview를 ItemReviewDto로 변환하는 메서드
    private ItemReviewDto convertToDto(ItemReview itemReview) {
        if (itemReview == null) {
            return null;
        }

        ItemReviewDto dto = new ItemReviewDto();
        dto.setReviewId(itemReview.getReviewId());
        dto.setItemId(itemReview.getItemId());
        dto.setContent(itemReview.getContent());
        dto.setRegdate(itemReview.getRegdate());
        dto.setMemberId(itemReview.getMemberId());
        dto.setMemberName(itemReview.getMemberName());

        // 리뷰 이미지를 DTO로 변환하고 추가
        dto.setImages(itemReview.getImages().stream()
                .map(img -> new ReviewImageDto(img.getImageId(), img.getFileName()))
                .collect(Collectors.toList()));

        // 아이템 DTO 설정
        if (itemReview.getItem() != null) {
            ItemTagDto itemDto = new ItemTagDto();
            itemDto.setItemId(itemReview.getItem().getItemId());
            itemDto.setItemName(itemReview.getItem().getItemName());
            itemDto.setPrice(itemReview.getItem().getPrice());

            // 아이템의 이미지 설정
            if (itemReview.getItem().getImages() != null) {
                List<ItemImageDto> itemImages = itemReview.getItem().getImages().stream()
                        .map(img -> new ItemImageDto(img.getUuid(), img.getFileName(), img.getItemId()))
                        .collect(Collectors.toList());
                itemDto.setImages(itemImages);
            }

            dto.setItem(itemDto);
        }

        return dto;
    }
}