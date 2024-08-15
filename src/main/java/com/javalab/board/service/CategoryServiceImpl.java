package com.javalab.board.service;

import com.javalab.board.repository.CategoryMapper;
import com.javalab.board.vo.CategoryFormDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryMapper categoryMapper;

	@Override
	public List<CategoryFormDTO> getCategory(Long parentId) {
		return categoryMapper.selectCategories(parentId);
	}
}