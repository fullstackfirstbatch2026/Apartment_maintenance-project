package com.example.application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.application.MaintenanceRequest;
import com.example.application.repository.MaintenanceRequestRepository;

@Service
public class MaintenanceRequestService {

    private final MaintenanceRequestRepository maintenanceRequestRepository;

    public MaintenanceRequestService(MaintenanceRequestRepository maintenanceRequestRepository) {
        this.maintenanceRequestRepository = maintenanceRequestRepository;
    }

    public List<MaintenanceRequest> getAllRequests() {
        return maintenanceRequestRepository.findAll();
    }

    public List<Object[]> getMaintenanceRequestDetails() {
        return maintenanceRequestRepository.getMaintenanceRequestDetails();
    }

    public MaintenanceRequest getRequestById(Integer id) {
        return maintenanceRequestRepository.findById(id).orElse(null);
    }

    public MaintenanceRequest saveRequest(MaintenanceRequest request) {
        return maintenanceRequestRepository.save(request);
    }
    public void createMaintenanceRequest(
            Integer residentId,
            Integer apartmentId,
            String description,
            java.sql.Date requestDate,
            Double estimatedCost) {

        maintenanceRequestRepository.createMaintenanceRequest(
                residentId,
                apartmentId,
                description,
                requestDate,
                estimatedCost
        );
    }
}