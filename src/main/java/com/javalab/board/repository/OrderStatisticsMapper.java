package com.javalab.board.repository;

import com.javalab.board.vo.OrderStatisticsDTO;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

@Mapper
public interface OrderStatisticsMapper {
    List<OrderStatisticsDTO> getDailyOrderStatistics();
    List<OrderStatisticsDTO> getOrderStatisticsByStatus();
    BigDecimal getTotalOrderAmount();
    Long getTotalOrderCount();
}