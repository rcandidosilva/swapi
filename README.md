# SWAPI

This application is a sample app using [Star Wars API (SWAPI)](https://swapi.tech/).

## Development

The build system will install automatically the recommended version of Node and npm.

We provide a wrapper to launch npm.
You will only need to run this command when dependencies change in [package.json](package.json).

```
cd swapi_web && ./npmw install
```

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

```
cd swapi_api && ./gradew -x webapp
cd swapi_web && ./npmw start
```

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `./npmw update` and `./npmw install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `./npmw help update`.

The `./npmw run` command will list all the scripts available to run for this project.

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

```
cd swapi_web && ./npmw install --save --save-exact leaflet
```

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

```
cd swapi_web && ./npmw install --save-dev --save-exact @types/leaflet
```

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Note: There are still a few other things remaining to do for Leaflet that we won't detail here.


## Building for production

### Packaging as jar

To build the final jar and optimize the swapi_api application for production, run:

```
cd swapi_api && ./gradlew -Pprod clean bootJar
```

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

```
java -jar build/libs/*.jar
```

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```
cd swapi_api && ./gradlew -Pprod -Pwar clean bootWar
```

## Testing

### Spring Boot tests

To launch your application's tests, run:

```
cd swapi_api && ./gradlew test integrationTest jacocoTestReport
```

### Client tests

Unit tests are run by [Jest][]. They're located near components and can be run with:

```
cd swapi_web && ./npmw test
```

## Docker Compose support

To start required services in Docker containers, run:

```
docker compose up -d
```

To stop and remove the containers, run:

```
docker compose down
```

Then navigate to [http://localhost](http://localhost) in your browser.