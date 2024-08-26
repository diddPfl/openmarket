package com.javalab.board.service;

import com.javalab.board.repository.OrderStatisticsMapper;
import com.javalab.board.vo.OrderStatisticsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class OrderStatisticsServiceImpl implements OrderStatisticsService {

    @Autowired
    private OrderStatisticsMapper orderStatisticsMapper;

    @Override
    public List<OrderStatisticsDTO> getDailyOrderStatistics(LocalDate startDate, LocalDate endDate) {
        return orderStatisticsMapper.getDailyOrderStatistics(startDate, endDate);
    }

    @Override
    public List<OrderStatisticsDTO> getOrderStatisticsByStatus() {
        return orderStatisticsMapper.getOrderStatisticsByStatus();
    }

    @Override
    public BigDecimal getTotalOrderAmount() {
        return orderStatisticsMapper.getTotalOrderAmount();
    }

    @Override
    public Long getTotalOrderCount() {
        return orderStatisticsMapper.getTotalOrderCount();
    }
}