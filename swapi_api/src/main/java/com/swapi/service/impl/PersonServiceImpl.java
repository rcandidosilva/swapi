package com.swapi.service.impl;

import com.swapi.repository.PersonRepository;
import com.swapi.service.PersonService;
import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.PageList;
import com.swapi.service.dto.Person;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.swapi.domain.Person}.
 */
@Service
@Transactional
public class PersonServiceImpl implements PersonService {

    private static final Logger LOG = LoggerFactory.getLogger(PersonServiceImpl.class);

    private final PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public PageList findAll() {
        LOG.debug("Request to get all People");
        return personRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Person> findOne(Long id) {
        LOG.debug("Request to get Person : {}", id);
        return personRepository.findById(id);
    }


    @Override
    @Transactional(readOnly = true)
    public ListRecord<Person> findByName(String name) {
        LOG.debug("Request to get People by name");
        return personRepository.findByName(name);
    }
}
