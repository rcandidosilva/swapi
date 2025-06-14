package com.swapi.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Film (
        String title,
        Integer episodeId,
        @JsonProperty("opening_crawl")
        String openingCrawl,
        String director,
        String producer,
        @JsonProperty("release_date")
        LocalDate releaseDate         
) {}
