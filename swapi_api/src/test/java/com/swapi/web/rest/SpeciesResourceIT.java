package com.swapi.web.rest;

import static com.swapi.domain.SpeciesAsserts.*;
import static com.swapi.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swapi.IntegrationTest;
import com.swapi.domain.Species;
import com.swapi.repository.SpeciesRepository;
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
 * Integration tests for the {@link SpeciesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SpeciesResourceIT {

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_EDITED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EDITED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CLASSIFICATION = "AAAAAAAAAA";
    private static final String UPDATED_CLASSIFICATION = "BBBBBBBBBB";

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_AVERAGE_HEIGHT = 1;
    private static final Integer UPDATED_AVERAGE_HEIGHT = 2;

    private static final String DEFAULT_SKIN_COLORS = "AAAAAAAAAA";
    private static final String UPDATED_SKIN_COLORS = "BBBBBBBBBB";

    private static final String DEFAULT_HAIR_COLORS = "AAAAAAAAAA";
    private static final String UPDATED_HAIR_COLORS = "BBBBBBBBBB";

    private static final String DEFAULT_EYE_COLORS = "AAAAAAAAAA";
    private static final String UPDATED_EYE_COLORS = "BBBBBBBBBB";

    private static final Integer DEFAULT_AVERAGE_LIFESPAN = 1;
    private static final Integer UPDATED_AVERAGE_LIFESPAN = 2;

    private static final String DEFAULT_LANGUAGES = "AAAAAAAAAA";
    private static final String UPDATED_LANGUAGES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/species";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SpeciesRepository speciesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSpeciesMockMvc;

    private Species species;

    private Species insertedSpecies;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Species createEntity() {
        return new Species()
            .created(DEFAULT_CREATED)
            .edited(DEFAULT_EDITED)
            .name(DEFAULT_NAME)
            .classification(DEFAULT_CLASSIFICATION)
            .designation(DEFAULT_DESIGNATION)
            .averageHeight(DEFAULT_AVERAGE_HEIGHT)
            .skinColors(DEFAULT_SKIN_COLORS)
            .hairColors(DEFAULT_HAIR_COLORS)
            .eyeColors(DEFAULT_EYE_COLORS)
            .averageLifespan(DEFAULT_AVERAGE_LIFESPAN)
            .languages(DEFAULT_LANGUAGES);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Species createUpdatedEntity() {
        return new Species()
            .created(UPDATED_CREATED)
            .edited(UPDATED_EDITED)
            .name(UPDATED_NAME)
            .classification(UPDATED_CLASSIFICATION)
            .designation(UPDATED_DESIGNATION)
            .averageHeight(UPDATED_AVERAGE_HEIGHT)
            .skinColors(UPDATED_SKIN_COLORS)
            .hairColors(UPDATED_HAIR_COLORS)
            .eyeColors(UPDATED_EYE_COLORS)
            .averageLifespan(UPDATED_AVERAGE_LIFESPAN)
            .languages(UPDATED_LANGUAGES);
    }

    @BeforeEach
    void initTest() {
        species = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedSpecies != null) {
            //speciesRepository.delete(insertedSpecies);
            insertedSpecies = null;
        }
    }

    @Test
    @Transactional
    void getAllSpecies() throws Exception {
        // Initialize the database
        //insertedSpecies = speciesRepository.saveAndFlush(species);

        // Get all the speciesList
        restSpeciesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(species.getId().intValue())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].edited").value(hasItem(sameInstant(DEFAULT_EDITED))))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].classification").value(hasItem(DEFAULT_CLASSIFICATION)))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].averageHeight").value(hasItem(DEFAULT_AVERAGE_HEIGHT)))
            .andExpect(jsonPath("$.[*].skinColors").value(hasItem(DEFAULT_SKIN_COLORS)))
            .andExpect(jsonPath("$.[*].hairColors").value(hasItem(DEFAULT_HAIR_COLORS)))
            .andExpect(jsonPath("$.[*].eyeColors").value(hasItem(DEFAULT_EYE_COLORS)))
            .andExpect(jsonPath("$.[*].averageLifespan").value(hasItem(DEFAULT_AVERAGE_LIFESPAN)))
            .andExpect(jsonPath("$.[*].languages").value(hasItem(DEFAULT_LANGUAGES)));
    }

    @Test
    @Transactional
    void getSpecies() throws Exception {
        // Initialize the database
        //insertedSpecies = speciesRepository.saveAndFlush(species);

        // Get the species
        restSpeciesMockMvc
            .perform(get(ENTITY_API_URL_ID, species.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(species.getId().intValue()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.edited").value(sameInstant(DEFAULT_EDITED)))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.classification").value(DEFAULT_CLASSIFICATION))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION))
            .andExpect(jsonPath("$.averageHeight").value(DEFAULT_AVERAGE_HEIGHT))
            .andExpect(jsonPath("$.skinColors").value(DEFAULT_SKIN_COLORS))
            .andExpect(jsonPath("$.hairColors").value(DEFAULT_HAIR_COLORS))
            .andExpect(jsonPath("$.eyeColors").value(DEFAULT_EYE_COLORS))
            .andExpect(jsonPath("$.averageLifespan").value(DEFAULT_AVERAGE_LIFESPAN))
            .andExpect(jsonPath("$.languages").value(DEFAULT_LANGUAGES));
    }

    @Test
    @Transactional
    void getNonExistingSpecies() throws Exception {
        // Get the species
        restSpeciesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }


}
