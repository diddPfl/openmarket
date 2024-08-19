package com.javalab.board.controller;

import com.javalab.board.dto.ItemCreateDto;
import com.javalab.board.dto.ItemResponseDto;
import com.javalab.board.dto.ItemImageDto;
import com.javalab.board.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<ItemResponseDto>> getItemList() {
        List<ItemResponseDto> items = itemService.findAll();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponseDto> getItemById(@PathVariable("id") long itemId) {
        ItemResponseDto item = itemService.findById(itemId);
        if (item != null) {
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ItemResponseDto> createItem(@RequestBody ItemCreateDto itemCreateDto) {
        ItemResponseDto savedItem = itemService.save(itemCreateDto);
        System.out.println("Received item data: {}" + itemCreateDto);
        return ResponseEntity.ok(savedItem);
    }

    @PostMapping("/{itemId}/images")
    public ResponseEntity<List<ItemImageDto>> addItemImages(
            @PathVariable long itemId,
            @RequestBody List<ItemImageDto> images) {
        List<ItemImageDto> savedImages = itemService.saveItemImages(itemId, images);
        return ResponseEntity.ok(savedImages);
    }
}