package com.swapi.service.impl;

import com.swapi.service.dto.Film;
import com.swapi.service.dto.ListRecord;
import com.swapi.repository.FilmRepository;
import com.swapi.service.FilmService;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.swapi.domain.Film}.
 */
@Service
@Transactional
public class FilmServiceImpl implements FilmService {

    private static final Logger LOG = LoggerFactory.getLogger(FilmServiceImpl.class);

    private final FilmRepository filmRepository;

    public FilmServiceImpl(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public ListRecord<Film> findAllFilms() {
        LOG.debug("Request to get all Films");
        return filmRepository.findAllFilms();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Film> findOne(Long id) {
        LOG.debug("Request to get Film : {}", id);
        return filmRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ListRecord<Film> findByTitle(String title) {
        LOG.debug("Request to get Film by title");
        return filmRepository.findByTitle(title);
    }
}
