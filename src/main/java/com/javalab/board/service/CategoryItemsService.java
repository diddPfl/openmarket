package com.javalab.board.service;

import com.javalab.board.vo.Item;

import java.util.List;

public interface CategoryItemsService {
	List<Item> selectItemsByGubunSubCode(String gubunSubCode);
	List<Item> selectItemsByCategoryId(Long categoryId);
	List<String> selectAllBrands();
}
