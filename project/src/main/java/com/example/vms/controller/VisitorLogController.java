package com.example.vms.controller;

import com.example.vms.model.VisitorLog;
import com.example.vms.model.VisitorLogStatus;
import com.example.vms.service.AuthService;
import com.example.vms.service.VisitorLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/visitor-logs")
@RequiredArgsConstructor
public class VisitorLogController {
    private final VisitorLogService visitorLogService;
    private final AuthService authService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SECURITY')")
    public ResponseEntity<List<VisitorLog>> getAllVisitorLogs() {
        return ResponseEntity.ok(visitorLogService.getAllVisitorLogs());
    }

    @GetMapping("/host")
    @PreAuthorize("hasRole('HOST')")
    public ResponseEntity<List<VisitorLog>> getMyVisitorLogs() {
        return ResponseEntity.ok(visitorLogService.getVisitorLogsByHost(authService.getCurrentUser()));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<VisitorLog>> getVisitorLogsByStatus(@PathVariable VisitorLogStatus status) {
        return ResponseEntity.ok(visitorLogService.getVisitorLogsByStatus(status));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<VisitorLog>> getVisitorLogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant end) {
        return ResponseEntity.ok(visitorLogService.getVisitorLogsByDateRange(start, end));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitorLog> getVisitorLogById(@PathVariable UUID id) {
        return ResponseEntity.ok(visitorLogService.getVisitorLogById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HOST')")
    public ResponseEntity<VisitorLog> createVisitorLog(@RequestBody VisitorLog visitorLog) {
        return ResponseEntity.ok(visitorLogService.createVisitorLog(visitorLog));
    }

    @PostMapping("/{id}/check-in")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECURITY')")
    public ResponseEntity<VisitorLog> checkIn(@PathVariable UUID id) {
        return ResponseEntity.ok(visitorLogService.checkIn(id));
    }

    @PostMapping("/{id}/check-out")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECURITY')")
    public ResponseEntity<VisitorLog> checkOut(@PathVariable UUID id) {
        return ResponseEntity.ok(visitorLogService.checkOut(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteVisitorLog(@PathVariable UUID id) {
        visitorLogService.deleteVisitorLog(id);
        return ResponseEntity.ok().build();
    }
}