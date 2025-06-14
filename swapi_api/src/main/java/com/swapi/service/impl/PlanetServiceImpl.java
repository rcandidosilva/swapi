package com.swapi.service.impl;

import com.swapi.service.dto.Planet;
import com.swapi.repository.PlanetRepository;
import com.swapi.service.PlanetService;
import com.swapi.service.dto.PageList;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.swapi.domain.Planet}.
 */
@Service
@Transactional
public class PlanetServiceImpl implements PlanetService {

    private static final Logger LOG = LoggerFactory.getLogger(PlanetServiceImpl.class);

    private final PlanetRepository planetRepository;

    public PlanetServiceImpl(PlanetRepository planetRepository) {
        this.planetRepository = planetRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public PageList findAll() {
        LOG.debug("Request to get all Planets");
        return planetRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Planet> findOne(Long id) {
        LOG.debug("Request to get Planet : {}", id);
        return planetRepository.findById(id);
    }
}
