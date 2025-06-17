package com.swapi.service;

import java.util.Optional;

import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.PageList;
import com.swapi.service.dto.Person;

/**
 * Service Interface for managing {@link com.swapi.domain.Person}.
 */
public interface PersonService {

    /**
     * Get all the people.
     *
     * @return the list of entities.
     */
    PageList findAll();

    /**
     * Get the "id" person.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Person> findOne(Long id);

    /**
     * Get people by name.
     *
     * @return the list of entities.
     */
    ListRecord<Person> findByName(String name);

}
