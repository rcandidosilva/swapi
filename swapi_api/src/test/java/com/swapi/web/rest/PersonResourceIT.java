package com.swapi.web.rest;

import static com.swapi.domain.PersonAsserts.*;
import static com.swapi.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swapi.IntegrationTest;
import com.swapi.domain.Person;
import com.swapi.repository.PersonRepository;
import com.swapi.service.PersonService;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PersonResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PersonResourceIT {

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_EDITED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EDITED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_HEIGHT = 1;
    private static final Integer UPDATED_HEIGHT = 2;

    private static final Double DEFAULT_MASS = 1D;
    private static final Double UPDATED_MASS = 2D;

    private static final String DEFAULT_HAIR_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_HAIR_COLOR = "BBBBBBBBBB";

    private static final String DEFAULT_SKIN_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_SKIN_COLOR = "BBBBBBBBBB";

    private static final String DEFAULT_EYEY_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_EYEY_COLOR = "BBBBBBBBBB";

    private static final String DEFAULT_BIRTH_YEAR = "AAAAAAAAAA";
    private static final String UPDATED_BIRTH_YEAR = "BBBBBBBBBB";

    private static final String DEFAULT_GENDER = "AAAAAAAAAA";
    private static final String UPDATED_GENDER = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/people";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private PersonRepository personRepository;

    @Mock
    private PersonRepository personRepositoryMock;

    @Mock
    private PersonService personServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersonMockMvc;

    private Person person;

    private Person insertedPerson;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Person createEntity() {
        return new Person()
            .created(DEFAULT_CREATED)
            .edited(DEFAULT_EDITED)
            .name(DEFAULT_NAME)
            .height(DEFAULT_HEIGHT)
            .mass(DEFAULT_MASS)
            .hairColor(DEFAULT_HAIR_COLOR)
            .skinColor(DEFAULT_SKIN_COLOR)
            .eyeyColor(DEFAULT_EYEY_COLOR)
            .birthYear(DEFAULT_BIRTH_YEAR)
            .gender(DEFAULT_GENDER);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Person createUpdatedEntity() {
        return new Person()
            .created(UPDATED_CREATED)
            .edited(UPDATED_EDITED)
            .name(UPDATED_NAME)
            .height(UPDATED_HEIGHT)
            .mass(UPDATED_MASS)
            .hairColor(UPDATED_HAIR_COLOR)
            .skinColor(UPDATED_SKIN_COLOR)
            .eyeyColor(UPDATED_EYEY_COLOR)
            .birthYear(UPDATED_BIRTH_YEAR)
            .gender(UPDATED_GENDER);
    }

    @BeforeEach
    void initTest() {
        person = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedPerson != null) {
            //personRepository.delete(insertedPerson);
            insertedPerson = null;
        }
    }

    @Test
    @Transactional
    void getAllPeople() throws Exception {
        // Initialize the database
        //insertedPerson = personRepository.saveAndFlush(person);

        // Get all the personList
        restPersonMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(person.getId().intValue())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].edited").value(hasItem(sameInstant(DEFAULT_EDITED))))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT)))
            .andExpect(jsonPath("$.[*].mass").value(hasItem(DEFAULT_MASS)))
            .andExpect(jsonPath("$.[*].hairColor").value(hasItem(DEFAULT_HAIR_COLOR)))
            .andExpect(jsonPath("$.[*].skinColor").value(hasItem(DEFAULT_SKIN_COLOR)))
            .andExpect(jsonPath("$.[*].eyeyColor").value(hasItem(DEFAULT_EYEY_COLOR)))
            .andExpect(jsonPath("$.[*].birthYear").value(hasItem(DEFAULT_BIRTH_YEAR)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER)));
    }

    @Test
    @Transactional
    void getPerson() throws Exception {
        // Initialize the database
        //insertedPerson = personRepository.saveAndFlush(person);

        // Get the person
        restPersonMockMvc
            .perform(get(ENTITY_API_URL_ID, person.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(person.getId().intValue()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.edited").value(sameInstant(DEFAULT_EDITED)))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT))
            .andExpect(jsonPath("$.mass").value(DEFAULT_MASS))
            .andExpect(jsonPath("$.hairColor").value(DEFAULT_HAIR_COLOR))
            .andExpect(jsonPath("$.skinColor").value(DEFAULT_SKIN_COLOR))
            .andExpect(jsonPath("$.eyeyColor").value(DEFAULT_EYEY_COLOR))
            .andExpect(jsonPath("$.birthYear").value(DEFAULT_BIRTH_YEAR))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER));
    }
}
