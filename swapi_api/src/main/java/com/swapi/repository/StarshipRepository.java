package com.swapi.repository;

import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.Starship;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpStatusCodeException;

@Repository
public class StarshipRepository extends RestRepository<Starship> {

    public ListRecord<Starship> findByName(String name) {
        ResponseEntity<ListRecord<Starship>> response;
        try {
            response = restTemplate.exchange(getPath() + "?name=" + name , HttpMethod.GET, null, new ParameterizedTypeReference<ListRecord<Starship>>(){});
        } catch (HttpStatusCodeException e) {
            return null;
        }
        return response.getBody();
    }

}
