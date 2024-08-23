package com.javalab.board.dto;

import com.javalab.board.constant.ItemSellStatus;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemListDto {
    private long itemId;         // 상품 ID
    private String itemName;     // 상품 이름
    private long categoryId;    // 카테고리 아이디
    private String categoryName;
    private int price;           // 가격
    private LocalDate regdate;   // 등록일
    private ItemSellStatus itemSellStatus;
    private int isDisabled;
    private List<ItemImageDto> images; // 이미지DTO 리스트
}