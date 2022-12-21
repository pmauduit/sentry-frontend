FROM eclipse-temurin:17.0.5_8-jre

COPY build/libs/sentry-frontend-0.0.1-SNAPSHOT.jar /sentry-frontend.jar

ENTRYPOINT [ "java", "-jar" ]

CMD [ "/sentry-frontend.jar" ]

