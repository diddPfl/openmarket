package com.javalab.board.repository;

import com.javalab.board.vo.OrderStatisticsDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Mapper
public interface OrderStatisticsMapper {
    List<OrderStatisticsDTO> getDailyOrderStatistics(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    List<OrderStatisticsDTO> getOrderStatisticsByStatus();
    BigDecimal getTotalOrderAmount();
    Long getTotalOrderCount();
}