package com.javalab.board.controller;

import com.javalab.board.dto.*;
import com.javalab.board.service.ItemService;
import com.javalab.board.service.CartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/items")
public class ItemController {

    private static final Logger logger = LoggerFactory.getLogger(ItemController.class);
    private final ItemService itemService;
    private final CartService cartService;

    @Autowired
    public ItemController(ItemService itemService, CartService cartService) {
        this.itemService = itemService;
        this.cartService = cartService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<ItemListDto>> getItemList() {
        List<ItemListDto> items = itemService.findAll();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponseDto> getItemById(@PathVariable("id") long itemId) {
        ItemResponseDto item = itemService.findById(itemId);
        if (item != null) {
            System.out.println(item);
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{itemId}/related")
    public ResponseEntity<List<ItemTagDto>> getRelatedItems(@PathVariable long itemId) {
        List<ItemTagDto> relatedItems = itemService.getRelatedItems(itemId);
        return ResponseEntity.ok(relatedItems);
    }

    @PostMapping
    public ResponseEntity<ItemResponseDto> createItem(@RequestBody ItemCreateDto itemCreateDto) {
        try {
            ItemResponseDto savedItem = itemService.save(itemCreateDto);
            logger.info("Item created: {}", savedItem);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            logger.error("Error creating item: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/{itemId}/images")
    public ResponseEntity<List<ItemImageDto>> addItemImages(
            @PathVariable("itemId") long itemId,
            @RequestBody List<ItemImageDto> images) {
        {
            try {
                List<ItemImageDto> savedImages = itemService.saveItemImages(itemId, images);
                logger.info("Images added to item {}: {}", itemId, savedImages);
                return ResponseEntity.ok(savedImages);
            } catch (Exception e) {
                logger.error("Error adding item images: {}", e.getMessage(), e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }
    }

    @PutMapping("/{itemId}/disabled")
    public ResponseEntity<Void> disableItem(@PathVariable("itemId") long itemId) {
        try {
            itemService.disableItem(itemId);
            logger.info("Item disabled: {}", itemId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error disabling item: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{itemId}/addToCart")
    public ResponseEntity<?> addItemToCart(@PathVariable("itemId") long itemId, @RequestBody AddToCartRequest request) {
        try {
            cartService.addItemToCart(request.getMemberId(), itemId, request.getCount());
            return ResponseEntity.ok().body("Item added to cart");
        } catch (Exception e) {
            logger.error("Error adding item to cart: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding item to cart: " + e.getMessage());
        }
    }

    private static class AddToCartRequest {
        private Long memberId;
        private int count;

        // Getters and setters
        public Long getMemberId() {
            return memberId;
        }

        public void setMemberId(Long memberId) {
            this.memberId = memberId;
        }

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<ItemListDto>> searchItems(@RequestParam String term) {
        List<ItemListDto> searchResults = itemService.searchItems(term);
        return ResponseEntity.ok(searchResults);
    }
}
