package com.javalab.board.dto;

import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemImageDto {
    private String uuid;
    private String fileName;
    private long itemId;
    private int repimg;
    private String fullName;

    public ItemImageDto(String uuid, String fileName, long itemId, int repimg) {
        this.uuid = uuid;
        this.fileName = fileName;
        this.itemId = itemId;
        this.repimg = repimg;
        this.fullName = uuid + "_" + fileName;
    }

}