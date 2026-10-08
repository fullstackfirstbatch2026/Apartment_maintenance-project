package com.example.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.application.Apartment;

public interface ApartmentRepository extends JpaRepository<Apartment, Integer> {

    @Query("""
        SELECT a
        FROM Apartment a
        WHERE a.maintenanceCharge > (
            SELECT AVG(a2.maintenanceCharge)
            FROM Apartment a2
        )
        """)
    List<Apartment> findApartmentsAboveAverageCharge();

}