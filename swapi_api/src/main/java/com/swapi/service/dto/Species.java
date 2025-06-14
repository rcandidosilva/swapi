package com.swapi.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Species (
        String name,
        String classification,
        String designation,        
        @JsonProperty("average_height")
        Integer averageHeight,
        @JsonProperty("skin_colors")
        String skinColors,
        @JsonProperty("hair_colors")
        String hairColors,
        @JsonProperty("eye_colors")
        String eyeColors,
        @JsonProperty("average_lifespan")
        Integer averageLifespan,
        String languages
) {}