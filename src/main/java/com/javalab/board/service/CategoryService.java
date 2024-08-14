package com.javalab.board.service;

import com.javalab.board.vo.CategoryFormDTO;

import java.util.List;

public interface CategoryService {
	List<CategoryFormDTO> getCategory(Long parentId);
}