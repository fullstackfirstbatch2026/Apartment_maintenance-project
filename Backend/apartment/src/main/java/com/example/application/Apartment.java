package com.example.application;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer apartmentId;

    private String apartmentNumber;
    private String blockName;
    private Double maintenanceCharge;

    public Apartment() {
    }

    public Integer getApartmentId() {
        return apartmentId;
    }

    public void setApartmentId(Integer apartmentId) {
        this.apartmentId = apartmentId;
    }

    public String getApartmentNumber() {
        return apartmentNumber;
    }

    public void setApartmentNumber(String apartmentNumber) {
        this.apartmentNumber = apartmentNumber;
    }

    public String getBlockName() {
        return blockName;
    }

    public void setBlockName(String blockName) {
        this.blockName = blockName;
    }

    public Double getMaintenanceCharge() {
        return maintenanceCharge;
    }

    public void setMaintenanceCharge(Double maintenanceCharge) {
        this.maintenanceCharge = maintenanceCharge;
    }
}