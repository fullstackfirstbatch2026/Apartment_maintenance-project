package com.example.application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.application.Resident;
import com.example.application.repository.ResidentRepository;

@Service
public class ResidentService {

    private final ResidentRepository residentRepository;

    public ResidentService(ResidentRepository residentRepository) {
        this.residentRepository = residentRepository;
    }

    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    public Resident getResidentById(Integer id) {
        return residentRepository.findById(id).orElse(null);
    }

    public Resident saveResident(Resident resident) {
        return residentRepository.save(resident);
    }
}