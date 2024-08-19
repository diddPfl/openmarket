package com.javalab.board.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    private long itemId;         // 상품 ID
    private String itemName;     // 상품 이름
    private String itemDetail;   // 상품 상세 설명
    private String categoryName;
    private int price;           // 가격
    private LocalDate regdate;   // 등록일
    private List<ItemImageDto> images; // 이미지DTO 리스트
}