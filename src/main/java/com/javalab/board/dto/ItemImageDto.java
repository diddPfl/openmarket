package com.javalab.board.dto;

import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemImageDto {
    private String uuid;         // UUID
    private String fileName;     // 파일 이름
    private long ItemId;    // 이미지에 대한 아이템 ID
}