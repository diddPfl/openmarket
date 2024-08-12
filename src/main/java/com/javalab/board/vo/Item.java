@ToString
package com.javalab.board.vo;

import lombok.*;

import java.util.List;

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
//    private String fileName; // 이미지 경로를 저장할 필드 추가
    private List<ItemImage> images; // 이미지VO 리스트
}
