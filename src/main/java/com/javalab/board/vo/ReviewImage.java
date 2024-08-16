package com.javalab.board.vo;

import lombok.*;

import java.time.LocalDate;

@Getter @Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReviewImage {
    private long imageId;
    private String fileName;
}
