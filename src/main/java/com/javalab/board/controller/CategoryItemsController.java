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
	public List<Item> getItemsByGubun(@PathVariable("gubunSubCode") String gubunSubCode) {
		return categoryItemsService.selectItemsByGubunSubCode(gubunSubCode);
	}

	@GetMapping("/byCategory/{categoryId}")
	public List<Item> getItemsByCategory(@PathVariable("categoryId") Long categoryId) {
		return categoryItemsService.selectItemsByCategoryId(categoryId);
	}
}