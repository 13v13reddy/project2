package com.example.vms.controller;

import com.example.vms.model.Visitor;
import com.example.vms.model.VisitorStatus;
import com.example.vms.service.AuthService;
import com.example.vms.service.VisitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/visitors")
@RequiredArgsConstructor
public class VisitorController {
    private final VisitorService visitorService;
    private final AuthService authService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SECURITY')")
    public ResponseEntity<List<Visitor>> getAllVisitors() {
        return ResponseEntity.ok(visitorService.getAllVisitors());
    }

    @GetMapping("/host")
    @PreAuthorize("hasRole('HOST')")
    public ResponseEntity<List<Visitor>> getMyVisitors() {
        return ResponseEntity.ok(visitorService.getVisitorsByHost(authService.getCurrentUser()));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Visitor>> getVisitorsByStatus(@PathVariable VisitorStatus status) {
        return ResponseEntity.ok(visitorService.getVisitorsByStatus(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visitor> getVisitorById(@PathVariable UUID id) {
        return ResponseEntity.ok(visitorService.getVisitorById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HOST')")
    public ResponseEntity<Visitor> createVisitor(@RequestBody Visitor visitor) {
        if (!visitor.getHost().getId().equals(authService.getCurrentUser().getId()) &&
            !authService.getCurrentUser().getRole().equals("ADMIN")) {
            throw new RuntimeException("You can only create visitors for yourself");
        }
        return ResponseEntity.ok(visitorService.createVisitor(visitor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Visitor> updateVisitor(@PathVariable UUID id, @RequestBody Visitor visitor) {
        return ResponseEntity.ok(visitorService.updateVisitor(id, visitor));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Visitor> updateVisitorStatus(
            @PathVariable UUID id,
            @RequestParam VisitorStatus status) {
        return ResponseEntity.ok(visitorService.updateVisitorStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteVisitor(@PathVariable UUID id) {
        visitorService.deleteVisitor(id);
        return ResponseEntity.ok().build();
    }
}