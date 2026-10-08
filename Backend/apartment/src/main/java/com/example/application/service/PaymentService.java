package com.example.application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.application.Payment;
import com.example.application.repository.PaymentRepository;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Integer id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }
    public Double getOutstandingAmount(Integer apartmentId) {
        return paymentRepository.calculateOutstandingAmount(apartmentId);
    }
}