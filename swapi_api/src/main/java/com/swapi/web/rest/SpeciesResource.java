package com.swapi.web.rest;

import com.swapi.service.dto.PageItem;
import com.swapi.service.dto.Species;
import com.swapi.service.SpeciesService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.swapi.domain.Species}.
 */
@RestController
@RequestMapping("/api/species")
public class SpeciesResource {

    private static final Logger LOG = LoggerFactory.getLogger(SpeciesResource.class);

    private final SpeciesService speciesService;

    public SpeciesResource(SpeciesService speciesService) {
        this.speciesService = speciesService;
    }

    /**
     * {@code GET  /species} : get all the species.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of species in body.
     */
    @GetMapping("")
    public List<PageItem> getAllSpecies() {
        LOG.debug("REST request to get all Species");
        return speciesService.findAll().results();
    }

    /**
     * {@code GET  /species/:id} : get the "id" species.
     *
     * @param id the id of the species to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the species, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Species> getSpecies(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Species : {}", id);
        Optional<Species> species = speciesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(species);
    }

    /**
     * {@code GET  /species/?name=} : get list of species by "name".
     *
     * @param name the name of the species to search by.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of species in body.
     */
    @GetMapping("/")
    public List<PageItem> getPeopleByName(@RequestParam("name") String name) {
        LOG.debug("REST request to get Species by name : {}", name);
        return speciesService.findByName(name).result().stream()
            .map(r -> new PageItem(r.uid(), r.properties().name(), null)).collect(Collectors.toList());       
    }      
}
