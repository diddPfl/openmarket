package com.javalab.board.vo;

import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    private long itemId;
    private long categoryId;
    private String itemName;
    private String itemDetail;
    private double price;
}
