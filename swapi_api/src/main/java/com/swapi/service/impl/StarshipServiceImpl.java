package com.swapi.service.impl;

import com.swapi.service.dto.Starship;
import com.swapi.repository.StarshipRepository;
import com.swapi.service.StarshipService;
import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.PageList;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.swapi.domain.Starship}.
 */
@Service
@Transactional
public class StarshipServiceImpl implements StarshipService {

    private static final Logger LOG = LoggerFactory.getLogger(StarshipServiceImpl.class);

    private final StarshipRepository starshipRepository;

    public StarshipServiceImpl(StarshipRepository starshipRepository) {
        this.starshipRepository = starshipRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public PageList findAll() {
        LOG.debug("Request to get all Starships");
        return starshipRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Starship> findOne(Long id) {
        LOG.debug("Request to get Starship : {}", id);
        return starshipRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ListRecord<Starship> findByName(String name) {
        LOG.debug("Request to get Starship by name");
        return starshipRepository.findByName(name);
    }      
}
