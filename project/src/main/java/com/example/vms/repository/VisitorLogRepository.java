package com.example.vms.repository;

import com.example.vms.model.User;
import com.example.vms.model.VisitorLog;
import com.example.vms.model.VisitorLogStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface VisitorLogRepository extends JpaRepository<VisitorLog, UUID> {
    List<VisitorLog> findByHost(User host);
    List<VisitorLog> findByStatus(VisitorLogStatus status);
    List<VisitorLog> findByCheckInTimeBetween(Instant start, Instant end);
}