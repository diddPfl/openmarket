package com.javalab.board.service;

import com.javalab.board.vo.Order;
import java.util.List;
import java.util.Map;

public interface OrderService {
    Order createOrder(Order order);
    Order getOrderById(Long orderId);
    List<Order> getOrdersByMemberId(Long memberId);
    void updateOrderStatus(Long orderId, String status);
    Map<String, Long> getOrderStatusCounts(Long memberId);
}