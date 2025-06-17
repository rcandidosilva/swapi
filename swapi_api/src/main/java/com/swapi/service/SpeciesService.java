package com.swapi.service;

import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.PageList;
import com.swapi.service.dto.Species;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.swapi.domain.Species}.
 */
public interface SpeciesService {
    /**
     * Get all the species.
     *
     * @return the list of entities.
     */
    PageList findAll();

    /**
     * Get the "id" species.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Species> findOne(Long id);

    /**
     * Get species by name.
     *
     * @return the list of entities.
     */
    ListRecord<Species> findByName(String name);    
}
