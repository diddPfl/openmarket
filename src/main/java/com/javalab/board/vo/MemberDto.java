package com.javalab.board.vo;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CategoryFormDTO {
	private Long categoryId;
	private String categoryName;
	private Long parentId;
}