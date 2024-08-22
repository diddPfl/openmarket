package com.javalab.board.repository;

import com.javalab.board.vo.CartVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CartRepository {
    CartVO findCartByMemberId(@Param("memberId") Long memberId);
    void insertCart(CartVO cart);
    void deleteCart(@Param("cartId") Long cartId);
}