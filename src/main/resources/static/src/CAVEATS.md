# What is it about ?

Here are some notes about my issues & concerns when working on a frontend project.

## Developping the frontend part without the need of a backend

I can't find a convenient way to have:

* My code automatically rebuilt when I save a file. I regularly launch `./gradlew appNpmRunBuild` at the root of 
the repository

* A convenient way to mock the backend API. When I am developping the frontend part, I am commenting / uncommenting the
`fetch()` calls and replace them to a json import with fake datas.


**Both fixed by using 2 different expressJS servers, see commit f46220c185e79e042bff5074b49756ff841e2edf.**


## More on React / React Router

* For now, I have the feeling that I follow this convention:
A page (managed by react) == One XHR to get data. How could I have
several components on the same page ? I'd like to have something like:

```
-----------------------
|  Issue
|   issue title
| tags-----+-----------
| * key1   |
| * key2   | [empty]
| ...      |
|          |
------------------------
```

Then click on tag "key1" will load the right part:

```
--------------------------
|  Issue
|   issue title
| tags-----+--------------
| * [key1] | * value1
| * key2   | * value2
| ...      | * value3
|          |
--------------------------
```

To sum it up, to mix several components rendered and updated (Issue, Tag) on the same page (the issue details page) ?

* Related to the previous point, how to limit the number of queries made to the backend ?
