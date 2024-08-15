package com.javalab.board.controller;

import com.javalab.board.service.CategoryItemsService;
import com.javalab.board.vo.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categoryitems")
public class CategoryItemsController {

	private final CategoryItemsService categoryItemsService;

	@GetMapping("/byGubun/{gubunSubCode}")
	public List<Item> getItemsByGubun(@PathVariable String gubunSubCode) {
		return categoryItemsService.getItemsByGubunSubCode(gubunSubCode);
	}

	@GetMapping("/byCategory/{categoryId}")
	public List<Item> getItemsByCategory(@PathVariable Long categoryId) {
		return categoryItemsService.getItemsByCategoryId(categoryId);
	}
}