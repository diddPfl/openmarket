package com.javalab.board.dto;

import lombok.*;

@Getter @Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReviewImageDto {
    private long imageId;
    private String fileName;
}