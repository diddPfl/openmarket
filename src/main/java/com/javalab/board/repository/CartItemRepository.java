package com.javalab.board.repository;

import com.javalab.board.vo.CartItemVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CartItemRepository {
    // Retrieves all items in a specific cart
    List<CartItemVO> findItemsByCartId(@Param("cartId") Long cartId);

    // Inserts a new item into the cart
    void insertCartItem(CartItemVO cartItem);

    // Updates an existing item in the cart
    void updateCartItem(CartItemVO cartItem);

    // Removes a specific item from the cart
    void deleteCartItem(@Param("cartItemId") Long cartItemId);

    // Removes all items from a specific cart
    void deleteAllCartItems(@Param("cartId") Long cartId);

    // Finds a specific item in a specific cart
    CartItemVO findByCartIdAndItemId(@Param("cartId") Long cartId, @Param("itemId") Long itemId);

    CartItemVO findById(@Param("cartItemId") Long cartItemId);
}