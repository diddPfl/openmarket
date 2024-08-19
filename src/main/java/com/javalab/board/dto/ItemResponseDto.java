package com.javalab.board.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponseDto {
    private long itemId;
    private long categoryId;
    private String categoryName;
    private String gubunSubCode;
    private String itemName;
    private String itemDetail;
    private int price;
    private LocalDate regdate;
    private List<ItemImageDto> images;
    private String brand;  // 추가
    private int stockNumber;  // 추가
    private String itemSellStatus;  // 추가 (Enum을 문자열로 처리)
}