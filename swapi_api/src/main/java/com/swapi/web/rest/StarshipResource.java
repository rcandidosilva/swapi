package com.swapi.web.rest;

import com.swapi.service.dto.PageItem;
import com.swapi.service.dto.Starship;
import com.swapi.service.StarshipService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.swapi.domain.Starship}.
 */
@RestController
@RequestMapping("/api/starships")
public class StarshipResource {

    private static final Logger LOG = LoggerFactory.getLogger(StarshipResource.class);

    private final StarshipService starshipService;

    public StarshipResource(StarshipService starshipService) {
        this.starshipService = starshipService;
    }

    /**
     * {@code GET  /starships} : get all the starships.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of starships in body.
     */
    @GetMapping("")
    public List<PageItem> getAllStarships() {
        LOG.debug("REST request to get all Starships");
        return starshipService.findAll().results();
    }

    /**
     * {@code GET  /starships/:id} : get the "id" starship.
     *
     * @param id the id of the starship to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the starship, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Starship> getStarship(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Starship : {}", id);
        Optional<Starship> starship = starshipService.findOne(id);
        return ResponseUtil.wrapOrNotFound(starship);
    }

    /**
     * {@code GET  /starships/?name=} : get list of starships by "name".
     *
     * @param name the name of the starships to search by.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of starship in body.
     */
    @GetMapping("/")
    public List<PageItem> getPeopleByName(@RequestParam("name") String name) {
        LOG.debug("REST request to get Starship by name : {}", name);
        return starshipService.findByName(name).result().stream()
            .map(r -> new PageItem(r.uid(), r.properties().name(), null)).collect(Collectors.toList());       
    }       
}
