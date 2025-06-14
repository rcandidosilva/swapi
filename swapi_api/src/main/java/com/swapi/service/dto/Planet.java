package com.swapi.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Planet (
        String name,
        @JsonProperty("rotation_period")
        Integer rotationPeriod,
        @JsonProperty("orbital_period")
        Integer orbitalPeriod,
        Integer diameter,
        String climate,
        String gravity,
        String terrain,
        @JsonProperty("surface_water")
        Integer surfaceWater,
        Long population
) {}