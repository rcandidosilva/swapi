package com.swapi.service;

import com.swapi.service.dto.Starship;
import com.swapi.service.dto.PageList;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.swapi.domain.Starship}.
 */
public interface StarshipService {
    /**
     * Get all the starships.
     *
     * @return the list of entities.
     */
    PageList findAll();

    /**
     * Get the "id" starship.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Starship> findOne(Long id);
}
