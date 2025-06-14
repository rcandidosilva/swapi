package com.swapi.service;

import com.swapi.service.dto.PageList;
import com.swapi.service.dto.Vehicle;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.swapi.domain.Vehicle}.
 */
public interface VehicleService {
    /**
     * Get all the vehicles.
     *
     * @return the list of entities.
     */
    PageList findAll();

    /**
     * Get the "id" vehicle.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Vehicle> findOne(Long id);
}
