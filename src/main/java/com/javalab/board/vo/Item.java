package com.javalab.board.vo;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    private long itemId;
    private long categoryId;
    private String categoryName;
    private String itemName;
    private String itemDetail;
    private int price;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate regdate;
    private List<ItemImage> images; // 이미지VO 리스트
}
