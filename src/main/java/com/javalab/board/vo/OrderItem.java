package com.javalab.board.vo;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderItem {
    private Long orderItemId;
    private Long orderId;
    private Long itemId;
    private LocalDateTime regdate;
    private int count;
    private BigDecimal orderPrice;

    // Constructors
    public OrderItem() {}

    public OrderItem(Long orderId, Long itemId, int count, BigDecimal orderPrice) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.count = count;
        this.orderPrice = orderPrice;
    }

    // Getters and Setters
    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public LocalDateTime getRegdate() {
        return regdate;
    }

    public void setRegdate(LocalDateTime regdate) {
        this.regdate = regdate;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public BigDecimal getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(BigDecimal orderPrice) {
        this.orderPrice = orderPrice;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "orderItemId=" + orderItemId +
                ", orderId=" + orderId +
                ", itemId=" + itemId +
                ", regdate=" + regdate +
                ", count=" + count +
                ", orderPrice=" + orderPrice +
                '}';
    }
}