package com.swapi.repository;

import com.swapi.service.dto.ListRecord;
import com.swapi.service.dto.Vehicle;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpStatusCodeException;

@Repository
public class VehicleRepository extends RestRepository<Vehicle> {

    public ListRecord<Vehicle> findByName(String name) {
        ResponseEntity<ListRecord<Vehicle>> response;
        try {
            response = restTemplate.exchange(getPath() + "?name=" + name , HttpMethod.GET, null, new ParameterizedTypeReference<ListRecord<Vehicle>>(){});
        } catch (HttpStatusCodeException e) {
            return null;
        }
        return response.getBody();
    }

}
