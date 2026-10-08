package com.example.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.Resident;

public interface ResidentRepository extends JpaRepository<Resident, Integer> {

}