package com.example.vms.service;

import com.example.vms.model.User;
import com.example.vms.model.Visitor;
import com.example.vms.model.VisitorStatus;
import com.example.vms.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VisitorService {
    private final VisitorRepository visitorRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Visitor> getVisitorsByHost(User host) {
        return visitorRepository.findByHost(host);
    }

    @Transactional(readOnly = true)
    public List<Visitor> getVisitorsByStatus(VisitorStatus status) {
        return visitorRepository.findByStatus(status);
    }

    @Transactional(readOnly = true)
    public Visitor getVisitorById(UUID id) {
        return visitorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Visitor not found"));
    }

    @Transactional
    public Visitor createVisitor(Visitor visitor) {
        // Validate host exists
        userService.getUserById(visitor.getHost().getId());
        visitor.setStatus(VisitorStatus.PRE_REGISTERED);
        return visitorRepository.save(visitor);
    }

    @Transactional
    public Visitor updateVisitor(UUID id, Visitor visitorDetails) {
        Visitor visitor = getVisitorById(id);
        visitor.setName(visitorDetails.getName());
        visitor.setEmail(visitorDetails.getEmail());
        visitor.setPhone(visitorDetails.getPhone());
        visitor.setCompany(visitorDetails.getCompany());
        visitor.setPurpose(visitorDetails.getPurpose());
        visitor.setPhotoUrl(visitorDetails.getPhotoUrl());
        visitor.setDocumentUrl(visitorDetails.getDocumentUrl());
        visitor.setStatus(visitorDetails.getStatus());
        return visitorRepository.save(visitor);
    }

    @Transactional
    public Visitor updateVisitorStatus(UUID id, VisitorStatus status) {
        Visitor visitor = getVisitorById(id);
        visitor.setStatus(status);
        return visitorRepository.save(visitor);
    }

    @Transactional
    public void deleteVisitor(UUID id) {
        visitorRepository.deleteById(id);
    }
}