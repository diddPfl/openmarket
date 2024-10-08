package com.javalab.board.vo;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemReview {
    private long reviewId;
    private long itemId;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regdate;
    private String itemName;
    private String memberId;
    private String memberName;
    private List<ReviewImage> images; // 이미지VO 리스트
    private Item item; // Item 객체 추가
}
