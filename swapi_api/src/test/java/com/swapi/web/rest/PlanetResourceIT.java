package com.swapi.web.rest;

import static com.swapi.domain.PlanetAsserts.*;
import static com.swapi.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swapi.IntegrationTest;
import com.swapi.domain.Planet;
import com.swapi.repository.PlanetRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PlanetResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PlanetResourceIT {

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_EDITED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EDITED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_ROTATION_PERIOD = 1;
    private static final Integer UPDATED_ROTATION_PERIOD = 2;

    private static final Integer DEFAULT_ORBITAL_PERIOD = 1;
    private static final Integer UPDATED_ORBITAL_PERIOD = 2;

    private static final Integer DEFAULT_DIAMETER = 1;
    private static final Integer UPDATED_DIAMETER = 2;

    private static final String DEFAULT_CLIMATE = "AAAAAAAAAA";
    private static final String UPDATED_CLIMATE = "BBBBBBBBBB";

    private static final String DEFAULT_GRAVITY = "AAAAAAAAAA";
    private static final String UPDATED_GRAVITY = "BBBBBBBBBB";

    private static final String DEFAULT_TERRAIN = "AAAAAAAAAA";
    private static final String UPDATED_TERRAIN = "BBBBBBBBBB";

    private static final Integer DEFAULT_SURFACE_WATER = 1;
    private static final Integer UPDATED_SURFACE_WATER = 2;

    private static final Long DEFAULT_POPULATION = 1L;
    private static final Long UPDATED_POPULATION = 2L;

    private static final String ENTITY_API_URL = "/api/planets";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private PlanetRepository planetRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlanetMockMvc;

    private Planet planet;

    private Planet insertedPlanet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Planet createEntity() {
        return new Planet()
            .created(DEFAULT_CREATED)
            .edited(DEFAULT_EDITED)
            .name(DEFAULT_NAME)
            .rotationPeriod(DEFAULT_ROTATION_PERIOD)
            .orbitalPeriod(DEFAULT_ORBITAL_PERIOD)
            .diameter(DEFAULT_DIAMETER)
            .climate(DEFAULT_CLIMATE)
            .gravity(DEFAULT_GRAVITY)
            .terrain(DEFAULT_TERRAIN)
            .surfaceWater(DEFAULT_SURFACE_WATER)
            .population(DEFAULT_POPULATION);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Planet createUpdatedEntity() {
        return new Planet()
            .created(UPDATED_CREATED)
            .edited(UPDATED_EDITED)
            .name(UPDATED_NAME)
            .rotationPeriod(UPDATED_ROTATION_PERIOD)
            .orbitalPeriod(UPDATED_ORBITAL_PERIOD)
            .diameter(UPDATED_DIAMETER)
            .climate(UPDATED_CLIMATE)
            .gravity(UPDATED_GRAVITY)
            .terrain(UPDATED_TERRAIN)
            .surfaceWater(UPDATED_SURFACE_WATER)
            .population(UPDATED_POPULATION);
    }

    @BeforeEach
    void initTest() {
        planet = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedPlanet != null) {
            //planetRepository.delete(insertedPlanet);
            insertedPlanet = null;
        }
    }

    @Test
    @Transactional
    void getAllPlanets() throws Exception {
        // Initialize the database
        //insertedPlanet = planetRepository.saveAndFlush(planet);

        // Get all the planetList
        restPlanetMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planet.getId().intValue())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].edited").value(hasItem(sameInstant(DEFAULT_EDITED))))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].rotationPeriod").value(hasItem(DEFAULT_ROTATION_PERIOD)))
            .andExpect(jsonPath("$.[*].orbitalPeriod").value(hasItem(DEFAULT_ORBITAL_PERIOD)))
            .andExpect(jsonPath("$.[*].diameter").value(hasItem(DEFAULT_DIAMETER)))
            .andExpect(jsonPath("$.[*].climate").value(hasItem(DEFAULT_CLIMATE)))
            .andExpect(jsonPath("$.[*].gravity").value(hasItem(DEFAULT_GRAVITY)))
            .andExpect(jsonPath("$.[*].terrain").value(hasItem(DEFAULT_TERRAIN)))
            .andExpect(jsonPath("$.[*].surfaceWater").value(hasItem(DEFAULT_SURFACE_WATER)))
            .andExpect(jsonPath("$.[*].population").value(hasItem(DEFAULT_POPULATION.intValue())));
    }

    @Test
    @Transactional
    void getPlanet() throws Exception {
        // Initialize the database
        //insertedPlanet = planetRepository.saveAndFlush(planet);

        // Get the planet
        restPlanetMockMvc
            .perform(get(ENTITY_API_URL_ID, planet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(planet.getId().intValue()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.edited").value(sameInstant(DEFAULT_EDITED)))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.rotationPeriod").value(DEFAULT_ROTATION_PERIOD))
            .andExpect(jsonPath("$.orbitalPeriod").value(DEFAULT_ORBITAL_PERIOD))
            .andExpect(jsonPath("$.diameter").value(DEFAULT_DIAMETER))
            .andExpect(jsonPath("$.climate").value(DEFAULT_CLIMATE))
            .andExpect(jsonPath("$.gravity").value(DEFAULT_GRAVITY))
            .andExpect(jsonPath("$.terrain").value(DEFAULT_TERRAIN))
            .andExpect(jsonPath("$.surfaceWater").value(DEFAULT_SURFACE_WATER))
            .andExpect(jsonPath("$.population").value(DEFAULT_POPULATION.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingPlanet() throws Exception {
        // Get the planet
        restPlanetMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }
}
