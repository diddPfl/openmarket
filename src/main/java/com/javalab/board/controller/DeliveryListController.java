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
@RequestMapping("/api/mypage")
@CrossOrigin(origins = "http://localhost:3000") // Adjust this to match your React app's URL
public class DeliveryListController {

    private static final Logger logger = LoggerFactory.getLogger(DeliveryListController.class);

    @Autowired
    private OrderService orderService;

    @GetMapping("/deliverylist/{months}")
    public ResponseEntity<List<Order>> getDeliveryList(@PathVariable("months") int months) {
        logger.info("Fetching delivery list for the last {} months", months);
        Long memberId = getCurrentUserId();
        List<Order> filteredOrders = orderService.getOrdersByMemberId(memberId);
        if (filteredOrders.isEmpty()) {
            logger.info("No orders found for member ID: {}", memberId);
            return ResponseEntity.noContent().build();
        }
        logger.info("Found {} orders for member ID: {}", filteredOrders.size(), memberId);
        return ResponseEntity.ok(filteredOrders);
    }

    @GetMapping("/order-status-counts")
    public ResponseEntity<Map<String, Long>> getOrderStatusCounts() {
        logger.info("Fetching order status counts");
        Long memberId = getCurrentUserId();
        Map<String, Long> statusCounts = orderService.getOrderStatusCounts(memberId);
        return ResponseEntity.ok(statusCounts);
    }

    // Implement this method to get the current user's ID
    private Long getCurrentUserId() {
        // This could be implemented using Spring Security or your custom authentication mechanism
        // For now, we'll return a dummy value
        return 1L; // Replace this with actual implementation
    }
}