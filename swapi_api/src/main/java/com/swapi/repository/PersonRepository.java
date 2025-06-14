package com.swapi.repository;

import com.swapi.service.dto.Person;
import org.springframework.stereotype.Repository;

@Repository
public class PersonRepository extends RestRepository<Person> {}