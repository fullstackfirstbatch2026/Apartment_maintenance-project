package com.example.application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.application.Apartment;
import com.example.application.repository.ApartmentRepository;

@Service
public class ApartmentService {

    private final ApartmentRepository apartmentRepository;

    public ApartmentService(ApartmentRepository apartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }

    public List<Apartment> getAllApartments() {
        return apartmentRepository.findAll();
    }

    public List<Apartment> getApartmentsAboveAverageCharge() {
        return apartmentRepository.findApartmentsAboveAverageCharge();
    }

    public Apartment getApartmentById(Integer id) {
        return apartmentRepository.findById(id).orElse(null);
    }

    public Apartment saveApartment(Apartment apartment) {
        return apartmentRepository.save(apartment);
    }
}