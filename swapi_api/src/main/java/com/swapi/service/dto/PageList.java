package com.swapi.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PageList(
        String message,
        @JsonProperty("total_records")
        Integer totalRecords,
        @JsonProperty("total_pages")
        Integer totalPages,
        String previous,
        String next,
        List<PageItem> results
) {}