package com.example.application.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.application.Apartment;
import com.example.application.service.ApartmentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/apartments")
public class ApartmentController {

    private final ApartmentService apartmentService;

    public ApartmentController(ApartmentService apartmentService) {
        this.apartmentService = apartmentService;
    }

    @GetMapping
    public List<Apartment> getAllApartments() {
        return apartmentService.getAllApartments();
    }

    @GetMapping("/above-average")
    public List<Apartment> getApartmentsAboveAverageCharge() {
        return apartmentService.getApartmentsAboveAverageCharge();
    }

    @GetMapping("/{id}")
    public Apartment getApartmentById(@PathVariable Integer id) {
        return apartmentService.getApartmentById(id);
    }

    @PostMapping
    public Apartment saveApartment(@RequestBody Apartment apartment) {
        return apartmentService.saveApartment(apartment);
    }
    
}