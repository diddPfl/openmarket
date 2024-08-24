package com.javalab.board.vo;

import java.time.LocalDateTime;

public class Payment {
    private Long paymentId;
    private Long orderId;
    private LocalDateTime regdate;  // This will be set by the database
    private String impUid;
    private String payType;

    // Getters and Setters
    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getRegdate() {
        return regdate;
    }

    // We keep this method to allow MyBatis to set the value from the database
    public void setRegdate(LocalDateTime regdate) {
        this.regdate = regdate;
    }

    public String getImpUid() {
        return impUid;
    }

    public void setImpUid(String impUid) {
        this.impUid = impUid;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    // ToString method for debugging
    @Override
    public String toString() {
        return "Payment{" +
                "paymentId=" + paymentId +
                ", orderId=" + orderId +
                ", regdate=" + regdate +
                ", impUid='" + impUid + '\'' +
                ", payType='" + payType + '\'' +
                '}';
    }
}
