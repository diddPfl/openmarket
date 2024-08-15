package com.javalab.board.service;

import com.javalab.board.repository.CategoryItemsMapper;
import com.javalab.board.vo.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryItemsServiceImpl implements CategoryItemsService {

	private final CategoryItemsMapper categoryItemsMapper;

	@Override
	public List<Item> getItemsByGubunSubCode(String gubunSubCode) {
		return categoryItemsMapper.selectItemsByGubunSubCode(gubunSubCode);
	}

	@Override
	public List<Item> getItemsByCategoryId(Long categoryId) {
		return categoryItemsMapper.selectItemsByCategoryId(categoryId);
	}
}