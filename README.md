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


