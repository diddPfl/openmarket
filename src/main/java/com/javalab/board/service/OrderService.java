package com.javalab.board.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OrderService {
    public Map<String, Integer> getOrderStatusCounts(Long memberId) {
        // Implement this method to fetch order status counts from the database
        Map<String, Integer> orderStatus = new HashMap<>();
        orderStatus.put("received", 0);
        orderStatus.put("preparing", 0);
        orderStatus.put("shipping", 0);
        orderStatus.put("delivered", 0);
        orderStatus.put("cancelled", 0);
        orderStatus.put("exchanged", 0);
        orderStatus.put("returned", 0);
        orderStatus.put("confirmed", 0);
        // Populate the map with actual data from your database
        return orderStatus;
    }
}
