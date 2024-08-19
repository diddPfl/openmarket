package com.javalab.board.controller;

import com.javalab.board.dto.ItemDto;
import com.javalab.board.service.ItemService;
import com.javalab.board.vo.Item;
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
    public ResponseEntity<List<ItemDto>> getItemList() {
        List<ItemDto> items = itemService.findAll();
        return ResponseEntity.ok(items); // 200 OK와 함께 아이템 리스트 반환
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable("id") long itemId) {
        ItemDto item = itemService.findById(itemId);
        if (item != null) {
            return ResponseEntity.ok(item); // 200 OK와 함께 아이템 반환
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found 반환
        }
    }
}