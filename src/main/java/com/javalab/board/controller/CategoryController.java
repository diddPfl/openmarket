package com.javalab.board.controller;

import com.javalab.board.service.CategoryService;
import com.javalab.board.vo.CategoryFormDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping("/list")
	public List<CategoryFormDTO> getCategoryList() {
		return categoryService.getCategory(null);
	}

	@GetMapping("/subCategorylist")
	public List<CategoryFormDTO> getSubCategory(@RequestParam(name="parentId", defaultValue = "0") Long parentId) {
		return categoryService.getCategory(parentId);
	}
}