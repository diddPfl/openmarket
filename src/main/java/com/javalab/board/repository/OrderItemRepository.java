package com.javalab.board.repository;

import com.javalab.board.vo.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderItemRepository {
    List<OrderItem> getOrderItemsByOrderId(@Param("orderId") Long orderId);

}