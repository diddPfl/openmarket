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
import java.util.Arrays;
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

    private boolean isValidOrderStatus(String status) {
        return Arrays.asList("결제확인", "상품준비중", "배송중", "취소").contains(status);
    }

    @Override
    @Transactional
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("결제확인");
        logger.info("Inserting order: {}", order);

        // Insert the order first
        orderRepository.insertOrder(order);

        // Check if the order ID was generated
        if (order.getOrderId() == null) {
            throw new RuntimeException("Failed to generate order ID");
        }

        logger.info("Order inserted with ID: {}", order.getOrderId());

        // Set the orderId for all order items
        for (OrderItem item : order.getOrderItems()) {
            item.setOrderId(order.getOrderId());
        }

        // Insert all order items at once
        orderRepository.insertOrderItems(order.getOrderItems());

        logger.info("Order created successfully with ID: {}", order.getOrderId());
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

    public List<Order> getOrdersByMemberId(Long memberId) {
        List<Order> orders = orderRepository.getOrdersByMemberId(memberId);
        for (Order order : orders) {
            logger.info("Retrieved order: {}", order);
        }
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

    //    @Override
//    public List<Order> getOrdersForLastMonths(Long memberId, int months) {
//        LocalDateTime startDate = LocalDateTime.now().minusMonths(months);
//        List<Order> orders = orderRepository.findOrdersForMemberAfterDate(memberId, startDate);
//
//        // Log the retrieved orders for debugging
//        for (Order order : orders) {
//            logger.info("Retrieved Order: {}", order);
//        }
//
//        return orders;
//    }

}