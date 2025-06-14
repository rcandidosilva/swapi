package com.swapi.config;

import java.util.Map;

import com.swapi.service.dto.Film;
import com.swapi.service.dto.Person;
import com.swapi.service.dto.Planet;
import com.swapi.service.dto.Species;
import com.swapi.service.dto.Starship;
import com.swapi.service.dto.Vehicle;

/**
 * Application constants.
 */
@SuppressWarnings("all")
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^(?>[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*)|(?>[_.@A-Za-z0-9-]+)$";

    public static final String SYSTEM = "system";
    public static final String DEFAULT_LANGUAGE = "en";

    public static final Map<Class, String> endpoints = Map.of(
        Person.class, "/people",
        Planet.class, "/planets",
        Starship.class, "/starships",
        Vehicle.class, "/vehicles",
        Film.class, "/films",
        Species.class, "/species"

    );

    private Constants() {}
}
