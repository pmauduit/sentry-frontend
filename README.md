# Sentry-frontend

## Launch locally

1. define the env variables needed (see below, as well as the `env.dist` file)
2. `./gradlew bootRun`

## Build

`./gradlew build`

## docker build

It will require a gradle build before.

`docker build -t blah/sentry-frontend .`

## Environment variables to set

* `SENTRY_TOKEN`
* `CUSTOMER` (geo2france, grandest, ...)
* `WEBAPP` (geoserver, mapfishapp, ...)

# Develop on the frontend part

Into `src/main/resources/static`:

```
# This launches a mock API backend webserver
$ node server.js
# This launches the react dev webserver
$ npm start
```

See the json files under `./src` to change the mock
objects, and `server.js` if in the need to add some endpoints.

