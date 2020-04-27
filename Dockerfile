FROM openjdk:8

COPY build/libs/sentry-frontend-0.0.1-SNAPSHOT.jar /sentry-frontend.jar

ENTRYPOINT [ "java", "-jar" ]

CMD [ "/sentry-frontend.jar" ]

