package com.swapi.repository;

import com.swapi.config.Constants;
import com.swapi.service.dto.PageItem;
import com.swapi.service.dto.PageList;
import com.swapi.service.dto.Record;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

@SuppressWarnings("all")
public abstract class RestRepository<T> {

    @Autowired
    RestTemplate restTemplate;

    @Value("${swapi.baseUrl}")
    String baseUrl;

    protected String getPath() {
        Type type = ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        return baseUrl + Constants.endpoints.get(type) + "/";        
    }

    public Optional<T> findById(Long id) {        
        ResponseEntity<Record<T>> response;
        try {
            response = restTemplate.exchange(getPath() + id, HttpMethod.GET, null, new ParameterizedTypeReference<Record<T>>() {});
        } catch (HttpStatusCodeException e) {
            return Optional.empty();
        }

        return Optional.ofNullable(response.getBody().getResult().getProperties());
    }


    public PageList findAll() {
        ResponseEntity<PageList> response;
        try {
            response = restTemplate.getForEntity(getPath(), PageList.class);
        } catch (HttpStatusCodeException e) {
            return null;
        }
        return response.getBody();
    }

}
