package com.swapi.service.impl;

import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.PageList;
import com.swapi.service.dto.Species;
import com.swapi.repository.SpeciesRepository;
import com.swapi.service.SpeciesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.swapi.domain.Species}.
 */
@Service
@Transactional
public class SpeciesServiceImpl implements SpeciesService {

    private static final Logger LOG = LoggerFactory.getLogger(SpeciesServiceImpl.class);

    private final SpeciesRepository speciesRepository;

    public SpeciesServiceImpl(SpeciesRepository speciesRepository) {
        this.speciesRepository = speciesRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public PageList findAll() {
        LOG.debug("Request to get all Species");
        return speciesRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Species> findOne(Long id) {
        LOG.debug("Request to get Species : {}", id);
        return speciesRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ListRecord<Species> findByName(String name) {
        LOG.debug("Request to get Species by name");
        return speciesRepository.findByName(name);
    }    
}
