package com.javalab.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.javalab.board.service.CartService;
import com.javalab.board.vo.CartItemVO;
import com.javalab.board.vo.CartVO;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{memberId}")
    public ResponseEntity<?> viewCart(@PathVariable Long memberId) {
        try {
            CartVO cart = cartService.getCartByMemberId(memberId);
            if (cart == null) {
                cart = cartService.createCart(memberId);
            }
            List<CartItemVO> cartItems = cartService.getCartItems(cart.getCartId());
            return ResponseEntity.ok().body(new CartResponse(cart, cartItems));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching cart: " + e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCartItem(@RequestBody CartItemVO cartItem) {
        try {
            cartService.addCartItem(cartItem);
            return ResponseEntity.ok().body("Item added to cart");
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
    public ResponseEntity<?> removeCartItem(@PathVariable Long cartItemId) {
        try {
            cartService.removeCartItem(cartItemId);
            return ResponseEntity.ok().body("Cart item removed");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing cart item: " + e.getMessage());
        }
    }

    @PostMapping("/clear/{cartId}")
    public ResponseEntity<?> clearCart(@PathVariable Long cartId) {
        try {
            cartService.clearCart(cartId);
            return ResponseEntity.ok().body("Cart cleared");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error clearing cart: " + e.getMessage());
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
