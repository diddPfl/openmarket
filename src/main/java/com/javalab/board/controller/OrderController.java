package com.javalab.board.controller;

import com.javalab.board.service.OrderService;
import com.javalab.board.vo.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            Order createdOrder = orderService.createOrder(order);
            return ResponseEntity.ok().body(Map.of("orderId", createdOrder.getOrderId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating order: " + e.getMessage());
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable("orderId") Long orderId) {
        logger.info("Fetching order with ID: {}", orderId);
        Order order = orderService.getOrderById(orderId);
        if (order != null) {
            logger.info("Found order: {}", order);
            return ResponseEntity.ok(order);
        } else {
            logger.warn("Order not found with ID: {}", orderId);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<Order>> getOrdersByMemberId(@PathVariable("memberId") Long memberId) {
        logger.info("Fetching orders for member ID: {}", memberId);
        List<Order> orders = orderService.getOrdersByMemberId(memberId);
        logger.info("Found {} orders for member ID: {}", orders.size(), memberId);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Void> updateOrderStatus(
            @PathVariable("orderId") Long orderId,
            @RequestBody String status) {
        logger.info("Updating order status for order ID: {} to status: {}", orderId, status);
        orderService.updateOrderStatus(orderId, status);
        logger.info("Order status updated successfully");
        return ResponseEntity.ok().build();
    }


}