package com.swapi.service.impl;

import com.swapi.service.dto.Vehicle;
import com.swapi.repository.VehicleRepository;
import com.swapi.service.VehicleService;
import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.PageList;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.swapi.domain.Vehicle}.
 */
@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {

    private static final Logger LOG = LoggerFactory.getLogger(VehicleServiceImpl.class);

    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public PageList findAll() {
        LOG.debug("Request to get all Vehicles");
        return vehicleRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Vehicle> findOne(Long id) {
        LOG.debug("Request to get Vehicle : {}", id);
        return vehicleRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ListRecord<Vehicle> findByName(String name) {
        LOG.debug("Request to get Vehicle by name");
        return vehicleRepository.findByName(name);
    }      
}
