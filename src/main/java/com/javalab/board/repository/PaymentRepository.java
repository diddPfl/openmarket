package com.javalab.board.repository;

import com.javalab.board.vo.Payment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PaymentRepository {
    Payment getPaymentById(@Param("paymentId") Long paymentId);

    void insertPayment(Payment payment);

    void updatePayment(Payment payment);

    void deletePayment(@Param("paymentId") Long paymentId);
}
