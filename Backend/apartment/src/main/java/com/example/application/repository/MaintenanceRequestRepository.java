package com.example.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;

import com.example.application.MaintenanceRequest;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Integer> {

    @Query("""
        SELECT mr.requestId,
               mr.requestDescription,
               mr.requestDate,
               mr.status,
               r.residentName,
               a.apartmentNumber,
               a.blockName
        FROM MaintenanceRequest mr
        JOIN Resident r
            ON mr.residentId = r.residentId
        JOIN Apartment a
            ON mr.apartmentId = a.apartmentId
        """)
    List<Object[]> getMaintenanceRequestDetails();
    @Procedure(procedureName = "create_maintenance_request")
    void createMaintenanceRequest(
            Integer p_resident_id,
            Integer p_apartment_id,
            String p_description,
            java.sql.Date p_request_date,
            Double p_estimated_cost
    );

}