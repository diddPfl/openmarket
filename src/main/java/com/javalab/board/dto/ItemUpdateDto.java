package com.javalab.board.dto;

import com.javalab.board.constant.ItemSellStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ItemUpdateDto {
    private long itemId;
    private String itemName;
    private String itemDetail;
    private int price;
    private int stockNumber;
    private ItemSellStatus itemSellStatus;
    private String brand;
    private List<ItemImageDto> images;
}
