package com.example.vms.service;

import com.example.vms.model.Location;
import com.example.vms.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    @Transactional(readOnly = true)
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Location> getActiveLocations() {
        return locationRepository.findByActiveTrue();
    }

    @Transactional(readOnly = true)
    public Location getLocationById(UUID id) {
        return locationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Location not found"));
    }

    @Transactional
    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    @Transactional
    public Location updateLocation(UUID id, Location locationDetails) {
        Location location = getLocationById(id);
        location.setName(locationDetails.getName());
        location.setAddress(locationDetails.getAddress());
        location.setCity(locationDetails.getCity());
        location.setState(locationDetails.getState());
        location.setZipCode(locationDetails.getZipCode());
        location.setCountry(locationDetails.getCountry());
        location.setCapacity(locationDetails.getCapacity());
        location.setActive(locationDetails.isActive());
        return locationRepository.save(location);
    }

    @Transactional
    public void deleteLocation(UUID id) {
        locationRepository.deleteById(id);
    }
}