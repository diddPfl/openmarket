package com.javalab.board.repository;

import com.javalab.board.vo.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderItemRepository {
    void insertOrderItem(OrderItem orderItem);
    List<OrderItem> getOrderItemsByOrderId(@Param("orderId") Long orderId);

}