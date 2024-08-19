package com.javalab.board.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemReviewDto {
    private long reviewId;
    private long itemId;
    private String content;
    private LocalDateTime regdate;
    private String itemName;
    private String memberId;
    private String memberName;
    private List<ReviewImageDto> images; // 이미지DTO 리스트
    private ItemDto item; // Item DTO 추가
}