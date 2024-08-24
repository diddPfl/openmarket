package com.javalab.board.service;

import com.javalab.board.repository.PaymentRepository;
import com.javalab.board.vo.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payment getPaymentById(Long paymentId) {
        return paymentRepository.getPaymentById(paymentId);
    }

    @Override
    public void insertPayment(Payment payment) {
        // We don't need to set regdate here, as the database will handle it
        paymentRepository.insertPayment(payment);
    }

    @Override
    public void updatePayment(Payment payment) {
        paymentRepository.updatePayment(payment);
    }

    @Override
    public void deletePayment(Long paymentId) {
        paymentRepository.deletePayment(paymentId);
    }
}
