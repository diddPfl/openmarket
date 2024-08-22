package com.javalab.board.controller;

import com.javalab.board.service.PaymentService;
import com.javalab.board.vo.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/{paymentId}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long paymentId) {
        Payment payment = paymentService.getPaymentById(paymentId);
        if (payment != null) {
            return ResponseEntity.ok(payment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Void> insertPayment(@RequestBody Payment payment) {
        paymentService.insertPayment(payment);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{paymentId}")
    public ResponseEntity<Void> updatePayment(@PathVariable Long paymentId,
                                              @RequestBody Payment payment) {
        payment.setPaymentId(paymentId);
        paymentService.updatePayment(payment);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{paymentId}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long paymentId) {
        paymentService.deletePayment(paymentId);
        return ResponseEntity.ok().build();
    }
}
