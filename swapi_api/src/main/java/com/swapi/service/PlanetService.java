package com.swapi.service;

import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.PageList;
import com.swapi.service.dto.Planet;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.swapi.domain.Planet}.
 */
public interface PlanetService {
    /**
     * Get all the planets.
     *
     * @return the list of entities.
     */
    PageList findAll();

    /**
     * Get the "id" planet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Planet> findOne(Long id);

    /**
     * Get planets by name.
     *
     * @return the list of entities.
     */
    ListRecord<Planet> findByName(String name);
}
