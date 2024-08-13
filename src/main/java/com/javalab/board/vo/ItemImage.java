package com.javalab.board.vo;

import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemImage {
    private String uuid;
    private long itemId;
    private String fileName;
}
