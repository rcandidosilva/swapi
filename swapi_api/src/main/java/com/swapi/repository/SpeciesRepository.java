package com.swapi.repository;

import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.Species;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpStatusCodeException;

@Repository
public class SpeciesRepository extends RestRepository<Species> {

    public ListRecord<Species> findByName(String name) {
        ResponseEntity<ListRecord<Species>> response;
        try {
            response = restTemplate.exchange(getPath() + "?name=" + name , HttpMethod.GET, null, new ParameterizedTypeReference<ListRecord<Species>>(){});
        } catch (HttpStatusCodeException e) {
            return null;
        }
        return response.getBody();
    }

}
