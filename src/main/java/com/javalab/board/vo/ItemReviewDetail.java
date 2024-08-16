package com.javalab.board.vo;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemReviewDetail {
    private long reviewId;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate regdate;
    private String memberId;
    private String memberName;
    private List<ReviewImage> images;
    private Item item;
}