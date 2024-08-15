package com.javalab.board.service;

import com.javalab.board.vo.Item;

import java.util.List;

public interface CategoryItemsService {
	List<Item> getItemsByGubunSubCode(String gubunSubCode);
	List<Item> getItemsByCategoryId(Long categoryId);
}