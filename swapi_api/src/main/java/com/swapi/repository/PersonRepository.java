package com.swapi.repository;

import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.Person;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpStatusCodeException;

@Repository
public class PersonRepository extends RestRepository<Person> {

    public ListRecord<Person> findByName(String name) {
        ResponseEntity<ListRecord<Person>> response;
        try {
            response = restTemplate.exchange(getPath() + "?name=" + name , HttpMethod.GET, null, new ParameterizedTypeReference<ListRecord<Person>>(){});
        } catch (HttpStatusCodeException e) {
            return null;
        }
        return response.getBody();
    }

}