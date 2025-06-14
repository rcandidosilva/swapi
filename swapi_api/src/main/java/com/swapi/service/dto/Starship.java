package com.swapi.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Starship(
        String name,
        String model,
        String manufacturer,
        @JsonProperty("cost_in_credits")
        Long costInCredits,
        Integer length,
        @JsonProperty("max_atmosphering_speed")
        Integer maxAtmospheringSpeed,
        Integer crew,
        Integer passengers,
        @JsonProperty("cargo_capacity")
        Long cargoCapacity,
        String consumables,
        @JsonProperty("hyperdrive_rating")
        Double hyperdriveRating,    
        Integer mglt,    
        @JsonProperty("startship_class")
        String startshipClass
) {}