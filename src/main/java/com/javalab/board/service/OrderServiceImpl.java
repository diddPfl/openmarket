package com.javalab.board.service;

import com.javalab.board.repository.OrderRepository;
import com.javalab.board.repository.OrderItemRepository;
import com.javalab.board.vo.Order;
import com.javalab.board.vo.OrderItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    @Transactional
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("결제확인"); // This should be one of the valid ENUM values
        logger.info("Inserting order: {}", order);
        Long orderId = orderRepository.insertOrder(order);
        order.setOrderId(orderId);

        for (OrderItem item : order.getOrderItems()) {
            item.setOrderId(orderId);
            orderItemRepository.insertOrderItem(item);
        }

        logger.info("Order created successfully with ID: {}", orderId);
        return order;
    }

    @Override
    public Order getOrderById(Long orderId) {
        logger.info("Fetching order by ID: {}", orderId);
        Order order = orderRepository.getOrderById(orderId);
        if (order != null) {
            order.setOrderItems(orderItemRepository.getOrderItemsByOrderId(orderId));
            logger.info("Order found: {}", order);
        } else {
            logger.warn("No order found with ID: {}", orderId);
        }
        return order;
    }

    @Override
    public List<Order> getOrdersByMemberId(Long memberId) {
        logger.info("Fetching orders for member ID: {}", memberId);
        List<Order> orders = orderRepository.getOrdersByMemberId(memberId);
        logger.info("Found {} orders for member ID: {}", orders.size(), memberId);
        return orders;
    }

    @Override
    public void updateOrderStatus(Long orderId, String status) {
        logger.info("Updating order status for order ID: {} to status: {}", orderId, status);
        orderRepository.updateOrderStatus(orderId, status);
        logger.info("Order status updated successfully");
    }

    @Override
    public Map<String, Long> getOrderStatusCounts(Long memberId) {
        logger.info("Getting order status counts for member ID: {}", memberId);
        List<Order> orders = orderRepository.getOrdersByMemberId(memberId);
        Map<String, Long> statusCounts = orders.stream()
                .collect(Collectors.groupingBy(Order::getOrderStatus, Collectors.counting()));
        logger.info("Order status counts: {}", statusCounts);
        return statusCounts;
    }
}