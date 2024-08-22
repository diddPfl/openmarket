package com.javalab.board.repository;

import com.javalab.board.vo.CartItemVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CartItemRepository {
    List<CartItemVO> findItemsByCartId(@Param("cartId") Long cartId);
    void insertCartItem(CartItemVO cartItem);
    void updateCartItem(CartItemVO cartItem);
    void deleteCartItem(@Param("cartItemId") Long cartItemId);
    void deleteAllCartItems(@Param("cartId") Long cartId);
}