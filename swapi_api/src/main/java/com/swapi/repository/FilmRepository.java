package com.swapi.repository;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpStatusCodeException;

import com.swapi.service.dto.Film;
import com.swapi.service.dto.ListRecord;

@Repository
public class FilmRepository extends RestRepository<Film> {

    public ListRecord<Film> findAllFilms() {
        ResponseEntity<ListRecord<Film>> response;
        try {
            response = restTemplate.exchange(getPath(), HttpMethod.GET, null, new ParameterizedTypeReference<ListRecord<Film>>(){});
        } catch (HttpStatusCodeException e) {
            return null;
        }
        return response.getBody();
    }

    public ListRecord<Film> findByTitle(String title) {
        ResponseEntity<ListRecord<Film>> response;
        try {
            response = restTemplate.exchange(getPath() + "?title=" + title , HttpMethod.GET, null, new ParameterizedTypeReference<ListRecord<Film>>(){});
        } catch (HttpStatusCodeException e) {
            return null;
        }
        return response.getBody();
    }

}