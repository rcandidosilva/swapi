package com.swapi.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RecordResult<I>(
    I properties,
    String description,
    String uid
) {}