package com.javalab.board.dto;

import com.javalab.board.constant.ItemSellStatus;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemTagDto {
    private long itemId;       // 상품 ID
    private String itemName;     // 상품 이름
    private int price;           // 가격
    private List<ItemImageDto> images = new ArrayList<>(); // 이미지DTO 리스트
}