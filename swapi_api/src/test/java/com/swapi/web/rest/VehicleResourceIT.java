package com.swapi.web.rest;

import static com.swapi.domain.VehicleAsserts.*;
import static com.swapi.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swapi.IntegrationTest;
import com.swapi.domain.Vehicle;
import com.swapi.repository.VehicleRepository;
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
 * Integration tests for the {@link VehicleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VehicleResourceIT {

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_EDITED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EDITED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    private static final String DEFAULT_MANUFACTURER = "AAAAAAAAAA";
    private static final String UPDATED_MANUFACTURER = "BBBBBBBBBB";

    private static final Long DEFAULT_COST_IN_CREDITS = 1L;
    private static final Long UPDATED_COST_IN_CREDITS = 2L;

    private static final Integer DEFAULT_LENGTH = 1;
    private static final Integer UPDATED_LENGTH = 2;

    private static final Integer DEFAULT_MAX_ATMOSPHERING_SPEED = 1;
    private static final Integer UPDATED_MAX_ATMOSPHERING_SPEED = 2;

    private static final Integer DEFAULT_CREW = 1;
    private static final Integer UPDATED_CREW = 2;

    private static final Integer DEFAULT_PASSENGERS = 1;
    private static final Integer UPDATED_PASSENGERS = 2;

    private static final Long DEFAULT_CARGO_CAPACITY = 1L;
    private static final Long UPDATED_CARGO_CAPACITY = 2L;

    private static final String DEFAULT_CONSUMABLES = "AAAAAAAAAA";
    private static final String UPDATED_CONSUMABLES = "BBBBBBBBBB";

    private static final String DEFAULT_VEHICLE_CLASS = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE_CLASS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/vehicles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVehicleMockMvc;

    private Vehicle vehicle;

    private Vehicle insertedVehicle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vehicle createEntity() {
        return new Vehicle()
            .created(DEFAULT_CREATED)
            .edited(DEFAULT_EDITED)
            .name(DEFAULT_NAME)
            .model(DEFAULT_MODEL)
            .manufacturer(DEFAULT_MANUFACTURER)
            .costInCredits(DEFAULT_COST_IN_CREDITS)
            .length(DEFAULT_LENGTH)
            .maxAtmospheringSpeed(DEFAULT_MAX_ATMOSPHERING_SPEED)
            .crew(DEFAULT_CREW)
            .passengers(DEFAULT_PASSENGERS)
            .cargoCapacity(DEFAULT_CARGO_CAPACITY)
            .consumables(DEFAULT_CONSUMABLES)
            .vehicleClass(DEFAULT_VEHICLE_CLASS);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vehicle createUpdatedEntity() {
        return new Vehicle()
            .created(UPDATED_CREATED)
            .edited(UPDATED_EDITED)
            .name(UPDATED_NAME)
            .model(UPDATED_MODEL)
            .manufacturer(UPDATED_MANUFACTURER)
            .costInCredits(UPDATED_COST_IN_CREDITS)
            .length(UPDATED_LENGTH)
            .maxAtmospheringSpeed(UPDATED_MAX_ATMOSPHERING_SPEED)
            .crew(UPDATED_CREW)
            .passengers(UPDATED_PASSENGERS)
            .cargoCapacity(UPDATED_CARGO_CAPACITY)
            .consumables(UPDATED_CONSUMABLES)
            .vehicleClass(UPDATED_VEHICLE_CLASS);
    }

    @BeforeEach
    void initTest() {
        vehicle = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedVehicle != null) {
            //vehicleRepository.delete(insertedVehicle);
            insertedVehicle = null;
        }
    }

    @Test
    @Transactional
    void getAllVehicles() throws Exception {
        // Initialize the database
        //insertedVehicle = vehicleRepository.saveAndFlush(vehicle);

        // Get all the vehicleList
        restVehicleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicle.getId().intValue())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].edited").value(hasItem(sameInstant(DEFAULT_EDITED))))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL)))
            .andExpect(jsonPath("$.[*].manufacturer").value(hasItem(DEFAULT_MANUFACTURER)))
            .andExpect(jsonPath("$.[*].costInCredits").value(hasItem(DEFAULT_COST_IN_CREDITS.intValue())))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH)))
            .andExpect(jsonPath("$.[*].maxAtmospheringSpeed").value(hasItem(DEFAULT_MAX_ATMOSPHERING_SPEED)))
            .andExpect(jsonPath("$.[*].crew").value(hasItem(DEFAULT_CREW)))
            .andExpect(jsonPath("$.[*].passengers").value(hasItem(DEFAULT_PASSENGERS)))
            .andExpect(jsonPath("$.[*].cargoCapacity").value(hasItem(DEFAULT_CARGO_CAPACITY.intValue())))
            .andExpect(jsonPath("$.[*].consumables").value(hasItem(DEFAULT_CONSUMABLES)))
            .andExpect(jsonPath("$.[*].vehicleClass").value(hasItem(DEFAULT_VEHICLE_CLASS)));
    }

    @Test
    @Transactional
    void getVehicle() throws Exception {
        // Initialize the database
        //insertedVehicle = vehicleRepository.saveAndFlush(vehicle);

        // Get the vehicle
        restVehicleMockMvc
            .perform(get(ENTITY_API_URL_ID, vehicle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vehicle.getId().intValue()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.edited").value(sameInstant(DEFAULT_EDITED)))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL))
            .andExpect(jsonPath("$.manufacturer").value(DEFAULT_MANUFACTURER))
            .andExpect(jsonPath("$.costInCredits").value(DEFAULT_COST_IN_CREDITS.intValue()))
            .andExpect(jsonPath("$.length").value(DEFAULT_LENGTH))
            .andExpect(jsonPath("$.maxAtmospheringSpeed").value(DEFAULT_MAX_ATMOSPHERING_SPEED))
            .andExpect(jsonPath("$.crew").value(DEFAULT_CREW))
            .andExpect(jsonPath("$.passengers").value(DEFAULT_PASSENGERS))
            .andExpect(jsonPath("$.cargoCapacity").value(DEFAULT_CARGO_CAPACITY.intValue()))
            .andExpect(jsonPath("$.consumables").value(DEFAULT_CONSUMABLES))
            .andExpect(jsonPath("$.vehicleClass").value(DEFAULT_VEHICLE_CLASS));
    }

    @Test
    @Transactional
    void getNonExistingVehicle() throws Exception {
        // Get the vehicle
        restVehicleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

}
