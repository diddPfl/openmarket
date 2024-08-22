package com.javalab.board.service;

import com.javalab.board.repository.CartRepository;
import com.javalab.board.repository.CartItemRepository;
import com.javalab.board.vo.CartItemVO;
import com.javalab.board.vo.CartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public CartVO getCartByMemberId(Long memberId) {
        return cartRepository.findCartByMemberId(memberId);
    }

    @Override
    @Transactional
    public CartVO createCart(Long memberId) {
        CartVO cart = new CartVO();
        cart.setMemberId(memberId);
        cartRepository.insertCart(cart);
        return cart;
    }

    @Override
    public List<CartItemVO> getCartItems(Long cartId) {
        return cartItemRepository.findItemsByCartId(cartId);
    }

    @Override
    @Transactional
    public void addCartItem(CartItemVO cartItem) {
        cartItemRepository.insertCartItem(cartItem);
    }

    @Override
    @Transactional
    public void updateCartItem(CartItemVO cartItem) {
        cartItemRepository.updateCartItem(cartItem);
    }

    @Override
    @Transactional
    public void removeCartItem(Long cartItemId) {
        cartItemRepository.deleteCartItem(cartItemId);
    }

    @Override
    @Transactional
    public void clearCart(Long cartId) {
        cartItemRepository.deleteAllCartItems(cartId);
    }
}