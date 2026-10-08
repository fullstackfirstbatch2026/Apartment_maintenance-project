package com.example.application.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.application.MaintenanceRequest;
import com.example.application.service.MaintenanceRequestService;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/maintenance-requests")
public class MaintenanceRequestController {

    private final MaintenanceRequestService maintenanceRequestService;

    public MaintenanceRequestController(MaintenanceRequestService maintenanceRequestService) {
        this.maintenanceRequestService = maintenanceRequestService;
    }

    @GetMapping
    public List<MaintenanceRequest> getAllRequests() {
        return maintenanceRequestService.getAllRequests();
    }

    @GetMapping("/details")
    public List<Object[]> getMaintenanceRequestDetails() {
        return maintenanceRequestService.getMaintenanceRequestDetails();
    }

    @GetMapping("/{id}")
    public MaintenanceRequest getRequestById(@PathVariable Integer id) {
        return maintenanceRequestService.getRequestById(id);
    }

    @PostMapping
    public MaintenanceRequest saveRequest(@RequestBody MaintenanceRequest request) {
        return maintenanceRequestService.saveRequest(request);
    }
    @PostMapping("/create-by-procedure")
    public String createByProcedure(
            @RequestParam Integer residentId,
            @RequestParam Integer apartmentId,
            @RequestParam String description,
            @RequestParam String requestDate,
            @RequestParam Double estimatedCost) {

        maintenanceRequestService.createMaintenanceRequest(
                residentId,
                apartmentId,
                description,
                java.sql.Date.valueOf(requestDate),
                estimatedCost
        );

        return "Maintenance request created successfully";
    }
}