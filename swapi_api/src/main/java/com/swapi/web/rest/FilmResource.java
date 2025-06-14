package com.swapi.web.rest;

import com.swapi.service.dto.Film;
import com.swapi.service.dto.PageItem;
import com.swapi.service.dto.PageList;
import com.swapi.service.FilmService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.swapi.domain.Film}.
 */
@RestController
@RequestMapping("/api/films")
public class FilmResource {

    private static final Logger LOG = LoggerFactory.getLogger(FilmResource.class);

    private final FilmService filmService;

    public FilmResource(FilmService filmService) {
        this.filmService = filmService;
    }

    /**
     * {@code GET  /films} : get all the films.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of films in body.
     */
    @GetMapping("")
    public List<PageItem> getAllFilms(@RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload) {
        LOG.debug("REST request to get all Films");
        return filmService.findAllFilms().getResult().stream()
            .map(r -> new PageItem(r.getUid(), r.getProperties().title(), null)).collect(Collectors.toList());            
    }

    /**
     * {@code GET  /films/:id} : get the "id" film.
     *
     * @param id the id of the film to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the film, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilm(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Film : {}", id);
        Optional<Film> film = filmService.findOne(id);
        return ResponseUtil.wrapOrNotFound(film);
    }
}
