package com.javalab.board.service;

import com.javalab.board.vo.Payment;

public interface PaymentService {
    Payment getPaymentById(Long paymentId);

    void insertPayment(Payment payment);

    void updatePayment(Payment payment);

    void deletePayment(Long paymentId);

}