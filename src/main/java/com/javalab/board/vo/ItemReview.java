package com.javalab.board.vo;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemReview {
    private long reviewId;
    private long itemId;
    private String content;
    private int rating;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate regdate;
    private String itemName;
    private String memberId;
    private String memberName;
}
