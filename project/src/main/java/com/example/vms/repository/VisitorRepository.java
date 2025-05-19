package com.example.vms.repository;

import com.example.vms.model.User;
import com.example.vms.model.Visitor;
import com.example.vms.model.VisitorStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VisitorRepository extends JpaRepository<Visitor, UUID> {
    List<Visitor> findByHost(User host);
    List<Visitor> findByStatus(VisitorStatus status);
}