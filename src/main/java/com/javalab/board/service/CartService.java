package com.javalab.board.service;

import com.javalab.board.vo.CartItemVO;
import com.javalab.board.vo.CartVO;

import java.util.List;

public interface CartService {
    CartVO getCartByMemberId(Long memberId);
    CartVO createCart(Long memberId);
    List<CartItemVO> getCartItems(Long cartId);
    void addCartItem(CartItemVO cartItem);
    void updateCartItem(CartItemVO cartItem);
    void removeCartItem(Long cartItemId);
    void clearCart(Long cartId);
    void addItemToCart(Long cartId, Long itemId, int count);
    CartItemVO getCartItem(Long cartItemId);
    void updateCartItemCount(Long cartItemId, int count);
}