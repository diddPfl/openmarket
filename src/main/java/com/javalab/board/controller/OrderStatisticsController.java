package com.javalab.board.controller;

import com.javalab.board.service.OrderStatisticsService;
import com.javalab.board.vo.OrderStatisticsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/order-statistics")
public class OrderStatisticsController {

	@Autowired
	private OrderStatisticsService orderStatisticsService;

	@GetMapping("/daily")
	public ResponseEntity<List<OrderStatisticsDTO>> getDailyOrderStatistics(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		return ResponseEntity.ok(orderStatisticsService.getDailyOrderStatistics(startDate, endDate));
	}

	@GetMapping("/by-status")
	public ResponseEntity<List<OrderStatisticsDTO>> getOrderStatisticsByStatus() {
		return ResponseEntity.ok(orderStatisticsService.getOrderStatisticsByStatus());
	}

	@GetMapping("/total-amount")
	public ResponseEntity<BigDecimal> getTotalOrderAmount() {
		return ResponseEntity.ok(orderStatisticsService.getTotalOrderAmount());
	}

	@GetMapping("/total-count")
	public ResponseEntity<Long> getTotalOrderCount() {
		return ResponseEntity.ok(orderStatisticsService.getTotalOrderCount());
	}
}