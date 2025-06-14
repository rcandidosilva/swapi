package com.swapi.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Person(        
        String name,
        Integer height,
        Double mass,
        @JsonProperty("hair_color")
        String hairColor,
        @JsonProperty("skin_color")
        String skinColor,
        @JsonProperty("eye_color")
        String eyeColor,
        @JsonProperty("birth_year")
        String birthYear,
        String gender
) {}