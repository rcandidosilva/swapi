package com.swapi.repository;

import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.Planet;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpStatusCodeException;

@Repository
public class PlanetRepository extends RestRepository<Planet> {

    public ListRecord<Planet> findByName(String name) {
        ResponseEntity<ListRecord<Planet>> response;
        try {
            response = restTemplate.exchange(getPath() + "?name=" + name , HttpMethod.GET, null, new ParameterizedTypeReference<ListRecord<Planet>>(){});
        } catch (HttpStatusCodeException e) {
            return null;
        }
        return response.getBody();
    }

}