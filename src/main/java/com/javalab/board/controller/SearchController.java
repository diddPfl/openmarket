package com.javalab.board.controller;

import com.javalab.board.dto.ItemListDto;
import com.javalab.board.service.ItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SearchController {

    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);

    private final ItemService itemService;

    @Autowired
    public SearchController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<ItemListDto>> searchItems(@RequestParam("term") String term) {
        List<ItemListDto> searchResults = itemService.searchItems(term);
        return ResponseEntity.ok(searchResults);
    }
}