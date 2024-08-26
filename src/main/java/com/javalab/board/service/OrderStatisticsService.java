package com.javalab.board.service;

import com.javalab.board.vo.OrderStatisticsDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface OrderStatisticsService {
    List<OrderStatisticsDTO> getDailyOrderStatistics(LocalDate startDate, LocalDate endDate);
    List<OrderStatisticsDTO> getOrderStatisticsByStatus();
    BigDecimal getTotalOrderAmount();
    Long getTotalOrderCount();
}