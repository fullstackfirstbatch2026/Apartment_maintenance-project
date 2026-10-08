package com.example.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.application.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	@Query(value = "SELECT calculate_outstanding_amount(:apartmentId)", nativeQuery = true)
	Double calculateOutstandingAmount(Integer apartmentId);
}