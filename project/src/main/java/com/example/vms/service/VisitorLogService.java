package com.example.vms.service;

import com.example.vms.model.*;
import com.example.vms.repository.VisitorLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VisitorLogService {
    private final VisitorLogRepository visitorLogRepository;
    private final VisitorService visitorService;
    private final LocationService locationService;

    @Transactional(readOnly = true)
    public List<VisitorLog> getAllVisitorLogs() {
        return visitorLogRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<VisitorLog> getVisitorLogsByHost(User host) {
        return visitorLogRepository.findByHost(host);
    }

    @Transactional(readOnly = true)
    public List<VisitorLog> getVisitorLogsByStatus(VisitorLogStatus status) {
        return visitorLogRepository.findByStatus(status);
    }

    @Transactional(readOnly = true)
    public List<VisitorLog> getVisitorLogsByDateRange(Instant start, Instant end) {
        return visitorLogRepository.findByCheckInTimeBetween(start, end);
    }

    @Transactional(readOnly = true)
    public VisitorLog getVisitorLogById(UUID id) {
        return visitorLogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Visitor log not found"));
    }

    @Transactional
    public VisitorLog createVisitorLog(VisitorLog visitorLog) {
        // Validate visitor and location exist
        Visitor visitor = visitorService.getVisitorById(visitorLog.getVisitor().getId());
        locationService.getLocationById(visitorLog.getLocation().getId());
        
        visitorLog.setHost(visitor.getHost());
        visitorLog.setStatus(VisitorLogStatus.EXPECTED);
        return visitorLogRepository.save(visitorLog);
    }

    @Transactional
    public VisitorLog checkIn(UUID id) {
        VisitorLog visitorLog = getVisitorLogById(id);
        visitorLog.setStatus(VisitorLogStatus.CHECKED_IN);
        visitorLog.setCheckInTime(Instant.now());
        
        // Update visitor status
        Visitor visitor = visitorLog.getVisitor();
        visitor.setStatus(VisitorStatus.CHECKED_IN);
        visitorService.updateVisitor(visitor.getId(), visitor);
        
        return visitorLogRepository.save(visitorLog);
    }

    @Transactional
    public VisitorLog checkOut(UUID id) {
        VisitorLog visitorLog = getVisitorLogById(id);
        visitorLog.setStatus(VisitorLogStatus.CHECKED_OUT);
        visitorLog.setCheckOutTime(Instant.now());
        
        // Update visitor status
        Visitor visitor = visitorLog.getVisitor();
        visitor.setStatus(VisitorStatus.CHECKED_OUT);
        visitorService.updateVisitor(visitor.getId(), visitor);
        
        return visitorLogRepository.save(visitorLog);
    }

    @Transactional
    public void deleteVisitorLog(UUID id) {
        visitorLogRepository.deleteById(id);
    }
}