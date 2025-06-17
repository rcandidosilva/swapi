package com.swapi.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Record<T>(
        String uid,
        String description,
        String message,
        RecordResult<T> result
) {}