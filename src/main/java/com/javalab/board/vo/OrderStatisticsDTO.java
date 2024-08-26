package com.javalab.board.vo;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatisticsDTO {
	private LocalDate date;
	private BigDecimal totalAmount;
	private Long orderCount;
	private String orderStatus;
}