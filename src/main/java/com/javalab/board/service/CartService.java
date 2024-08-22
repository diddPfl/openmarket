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
}