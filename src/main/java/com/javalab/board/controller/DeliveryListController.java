package com.javalab.board.controller;

import com.javalab.board.service.OrderService;
import com.javalab.board.vo.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

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

        // Assuming you have a way to get the current user's memberId
        Long memberId = getCurrentUserId(); // Implement this method to get the current user's ID

        List<Order> filteredOrders = orderService.getOrdersForLastMonths(memberId, months);

        if (filteredOrders.isEmpty()) {
            logger.info("No orders found for member ID: {} in the last {} months", memberId, months);
            return ResponseEntity.noContent().build();
        }

        logger.info("Found {} orders for member ID: {} in the last {} months", filteredOrders.size(), memberId, months);
        return ResponseEntity.ok(filteredOrders);
    }

    // Implement this method to get the current user's ID
    private Long getCurrentUserId() {
        // This could be implemented using Spring Security or your custom authentication mechanism
        // For now, we'll return a dummy value
        return 1L; // Replace this with actual implementation
    }
}