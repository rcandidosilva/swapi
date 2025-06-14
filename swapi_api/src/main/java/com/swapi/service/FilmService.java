package com.swapi.service;

import com.swapi.service.dto.Film;
import com.swapi.service.dto.ListRecord;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.swapi.domain.Film}.
 */
public interface FilmService {

    /**
     * Get all the films.
     *
     * @return the list of entities.
     */
    ListRecord<Film> findAllFilms();

    /**
     * Get the "id" film.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Film> findOne(Long id);
}
