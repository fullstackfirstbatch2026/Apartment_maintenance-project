package com.example.application.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.Resident;
import com.example.application.service.ResidentService;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/residents")
public class ResidentController {

    private final ResidentService residentService;

    public ResidentController(ResidentService residentService) {
        this.residentService = residentService;
    }

    @GetMapping
    public List<Resident> getAllResidents() {
        return residentService.getAllResidents();
    }

    @GetMapping("/{id}")
    public Resident getResidentById(@PathVariable Integer id) {
        return residentService.getResidentById(id);
    }

    @PostMapping
    public Resident saveResident(@RequestBody Resident resident) {
        return residentService.saveResident(resident);
    }
}