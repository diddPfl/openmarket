package com.javalab.board.controller;

import com.javalab.board.dto.*;
import com.javalab.board.service.ItemService;
import com.javalab.board.service.CartService;
import com.javalab.board.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/items")
public class ItemController {

    private static final Logger logger = LoggerFactory.getLogger(ItemController.class);
    private final ItemService itemService;
    private final CartService cartService;
    private final JwtService jwtService;

    @Autowired
    public ItemController(ItemService itemService, CartService cartService, JwtService jwtService) {
        this.itemService = itemService;
        this.cartService = cartService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<List<ItemListDto>> getItemList() {
        List<ItemListDto> items = itemService.findAll();
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

    @GetMapping("/{itemId}/related")
    public ResponseEntity<List<ItemTagDto>> getRelatedItems(@PathVariable long itemId) {
        List<ItemTagDto> relatedItems = itemService.getRelatedItems(itemId);
        return ResponseEntity.ok(relatedItems);
    }

    @PostMapping
    public ResponseEntity<?> createItem(@RequestBody ItemCreateDto itemCreateDto,
                                        HttpServletRequest request) {
        String userEmail = jwtService.getAuthUser(request);
        if (userEmail == null) {
            logger.warn("No authenticated user found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        logger.info("Authenticated user: {}", userEmail);
        try {
            ItemResponseDto savedItem = itemService.save(itemCreateDto);
            logger.info("Item created: {}", savedItem);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            logger.error("Error creating item: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{itemId}/edit")
    public ResponseEntity<?> updateItem(
            @PathVariable("itemId") long itemId,
            @RequestBody ItemUpdateDto itemUpdateDto,
            HttpServletRequest request) {
        String userEmail = jwtService.getAuthUser(request);
        if (userEmail == null) {
            logger.warn("No authenticated user found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            ItemResponseDto updatedItem = itemService.updateItem(itemId, itemUpdateDto);
            logger.info("Item updated: {}", updatedItem);
            return ResponseEntity.ok(updatedItem);
        } catch (Exception e) {
            logger.error("Error updating item: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/{itemId}/images")
    public ResponseEntity<?> addItemImages(
            @PathVariable("itemId") long itemId,
            @RequestBody List<ItemImageDto> images,
            HttpServletRequest request) {
        String userEmail = jwtService.getAuthUser(request);
        if (userEmail == null) {
            logger.warn("No authenticated user found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            List<ItemImageDto> savedImages = itemService.saveItemImages(itemId, images);
            logger.info("Images added to item {}: {}", itemId, savedImages);
            return ResponseEntity.ok(savedImages);
        } catch (Exception e) {
            logger.error("Error adding item images: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{itemId}/disabled")
    public ResponseEntity<?> disableItem(@PathVariable("itemId") long itemId,
                                         HttpServletRequest request) {
        String userEmail = jwtService.getAuthUser(request);
        if (userEmail == null) {
            logger.warn("No authenticated user found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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
    public ResponseEntity<?> addItemToCart(@PathVariable("itemId") long itemId,
                                           @RequestBody AddToCartRequest request,
                                           HttpServletRequest httpRequest) {
        String userEmail = jwtService.getAuthUser(httpRequest);
        if (userEmail == null) {
            logger.warn("No authenticated user found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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