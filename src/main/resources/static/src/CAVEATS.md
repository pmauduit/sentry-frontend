# What is it about ?

Here are some notes about my issues & concerns when working on a frontend project.

## Developping the frontend part without the need of a backend

I can't find a convenient way to have:

* My code automatically rebuilt when I save a file. I regularly launch `./gradlew appNpmRunBuild` at the root of 
the repository

* A convenient way to mock the backend API. When I am developping the frontend part, I am commenting / uncommenting the
`fetch()` calls and replace them to a json import with fake datas.


**Both fixed by using 2 different expressJS servers, see commit f46220c185e79e042bff5074b49756ff841e2edf.**
