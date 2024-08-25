package com.javalab.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.javalab.board.service.CartService;
import com.javalab.board.vo.CartItemVO;
import com.javalab.board.vo.CartVO;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{memberId}")
    public ResponseEntity<?> viewCart(@PathVariable("memberId") Long memberId) {
        try {
            CartVO cart = cartService.getCartByMemberId(memberId);
            List<CartItemVO> cartItems = cartService.getCartItems(cart.getCartId());
            return ResponseEntity.ok().body(new CartResponse(cart, cartItems));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching cart: " + e.getMessage());
        }
    }

    @GetMapping("/check/{memberId}")
    public ResponseEntity<?> checkCart(@PathVariable("memberId") String memberIdStr) {
        try {
            Long memberId = Long.parseLong(memberIdStr);
            CartVO cart = cartService.getCartByMemberId(memberId);
            return ResponseEntity.ok().body(Collections.singletonMap("cartId", cart.getCartId()));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid member ID");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCart(@RequestBody Map<String, String> payload) {
        try {
            String memberIdStr = payload.get("memberId");
            if (memberIdStr == null) {
                return ResponseEntity.badRequest().body("Member ID is required");
            }
            Long memberId = Long.parseLong(memberIdStr);
            CartVO cart = cartService.createCart(memberId);
            return ResponseEntity.ok().body(Collections.singletonMap("cartId", cart.getCartId()));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid member ID");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error creating cart: " + e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItemToCart(@RequestBody Map<String, Object> payload) {
        try {
            Long cartId = Long.parseLong(payload.get("cartId").toString());
            Long itemId = Long.parseLong(payload.get("itemId").toString());
            int count = Integer.parseInt(payload.get("count").toString());

            cartService.addItemToCart(cartId, itemId, count);
            List<CartItemVO> updatedItems = cartService.getCartItems(cartId);
            return ResponseEntity.ok().body(updatedItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding item to cart: " + e.getMessage());
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateCartItem(@RequestBody CartItemVO cartItem) {
        try {
            cartService.updateCartItem(cartItem);
            return ResponseEntity.ok().body("Cart item updated");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating cart item: " + e.getMessage());
        }
    }

    @PostMapping("/remove/{cartItemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable("cartItemId") Long cartItemId) {
        try {
            cartService.removeCartItem(cartItemId);
            return ResponseEntity.ok().body("Cart item removed");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing cart item: " + e.getMessage());
        }
    }

    @PostMapping("/clear/{cartId}")
    public ResponseEntity<?> clearCart(@PathVariable("cartId") Long cartId) {
        try {
            cartService.clearCart(cartId);
            return ResponseEntity.ok().body("Cart cleared");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error clearing cart: " + e.getMessage());
        }
    }

    @PostMapping("/item/{cartItemId}/count")
    public ResponseEntity<?> updateCartItemCount(@PathVariable("cartItemId") Long cartItemId, @RequestBody Map<String, Integer> payload) {
        try {
            Integer count = payload.get("count");
            if (count == null) {
                return ResponseEntity.badRequest().body("Count is required");
            }
            cartService.updateCartItemCount(cartItemId, count);
            CartItemVO updatedItem = cartService.getCartItem(cartItemId);

            Map<String, Object> response = new HashMap<>();
            response.put("item", updatedItem);
            response.put("totalPrice", updatedItem.getPrice() * updatedItem.getCount());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating cart item count: " + e.getMessage());
        }
    }

    private static class CartResponse {
        public CartVO cart;
        public List<CartItemVO> cartItems;

        public CartResponse(CartVO cart, List<CartItemVO> cartItems) {
            this.cart = cart;
            this.cartItems = cartItems;
        }
    }
}