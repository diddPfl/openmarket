package com.javalab.board.dto;

import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemImageDto {
    private String uuid;         // UUID
    private String fileName;     // 파일 이름
    private long itemId;    // 이미지에 대한 아이템 ID
    private String fullName; // uuid + fileName

    public ItemImageDto(String uuid, String fileName, Long itemId) {
        this.uuid = uuid;
        this.fileName = fileName;
        this.itemId = itemId;
        this.fullName = uuid + "_" + fileName;
    }
}