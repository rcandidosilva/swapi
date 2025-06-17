package com.swapi.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ListRecord<T>(
        String message,
        List<RecordResult<T>> result
) {}