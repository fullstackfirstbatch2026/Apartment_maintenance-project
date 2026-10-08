package com.example.application.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.Payment;
import com.example.application.service.PaymentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Integer id) {
        return paymentService.getPaymentById(id);
    }

    @PostMapping
    public Payment savePayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }
    @GetMapping("/outstanding/{apartmentId}")
    public Double getOutstandingAmount(@PathVariable Integer apartmentId) {
        return paymentService.getOutstandingAmount(apartmentId);
    }
}