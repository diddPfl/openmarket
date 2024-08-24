package com.javalab.board.repository;

import com.javalab.board.vo.Order;
import com.javalab.board.vo.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderRepository {
    Long insertOrder(Order order);
    Order getOrderById(@Param("orderId") Long orderId);
    List<Order> getOrdersByMemberId(@Param("memberId") Long memberId);
    void updateOrderStatus(@Param("orderId") Long orderId, @Param("status") String status);
}