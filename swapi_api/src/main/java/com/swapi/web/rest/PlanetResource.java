package com.swapi.web.rest;

import com.swapi.service.dto.Planet;
import com.swapi.service.PlanetService;
import com.swapi.service.dto.PageItem;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.swapi.domain.Planet}.
 */
@RestController
@RequestMapping("/api/planets")
public class PlanetResource {

    private static final Logger LOG = LoggerFactory.getLogger(PlanetResource.class);

    private final PlanetService planetService;

    public PlanetResource(PlanetService planetService) {
        this.planetService = planetService;
    }

    /**
     * {@code GET  /planets} : get all the planets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planets in body.
     */
    @GetMapping("")
    public List<PageItem> getAllPlanets() {
        LOG.debug("REST request to get all Planets");
        return planetService.findAll().results();
    }

    /**
     * {@code GET  /planets/:id} : get the "id" planet.
     *
     * @param id the id of the planet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Planet> getPlanet(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Planet : {}", id);
        Optional<Planet> planet = planetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(planet);
    }

    /**
     * {@code GET  /planets/?name=} : get list of planets by "name".
     *
     * @param name the name of the planet to search by.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planet in body.
     */
    @GetMapping("/")
    public List<PageItem> getPeopleByName(@RequestParam("name") String name) {
        LOG.debug("REST request to get Planet by name : {}", name);
        return planetService.findByName(name).result().stream()
            .map(r -> new PageItem(r.uid(), r.properties().name(), null)).collect(Collectors.toList());       
    }    
}