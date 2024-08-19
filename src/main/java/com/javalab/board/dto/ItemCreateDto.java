package com.javalab.board.dto;

import com.javalab.board.constant.ItemSellStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemCreateDto {
    private String itemName;
    private String itemDetail;
    private long categoryId;
    private int price;
    private String gubunSubCode;
    private int stockNumber;
    private ItemSellStatus itemSellStatus;
    private String brand;
}