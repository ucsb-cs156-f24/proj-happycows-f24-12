# HappyCows/HappierCows

# Production Deployments 

| Type | Link       | 
|------|------------|
| prod | <https://happycows.dokku-12.cs.ucsb.edu/>     | 
| qa   | <https://happycows-qa.dokku-12.cs.ucsb.edu/>  | 

# F24 Deployments

Tracks `main` branch:

| Team | Tracks Main Branch       | QA Deployment |
|------|--------------------------|---------------|
| f24-05 | <https://happycows.dokku-05.cs.ucsb.edu/> | <https://happycows-qa.dokku-05.cs.ucsb.edu/> | 
| f24-06 | <https://happycows.dokku-06.cs.ucsb.edu/>  | <https://happycows-qa.dokku-06.cs.ucsb.edu/> | 
| f24-07 | <https://happycows.dokku-07.cs.ucsb.edu/>  | <https://happycows-qa.dokku-07.cs.ucsb.edu/> | 
| f24-08 | <https://happycows.dokku-08.cs.ucsb.edu/>  | <https://happycows-qa.dokku-08.cs.ucsb.edu/> | 

# Description

This is a full rewrite of the application HappyCows, a project sponsored by [Mattanjah de Vries, Distingished Professor of Chemistry at UC Santa Barbara](https://www.chem.ucsb.edu/people/mattanjah-s-de-vries).


The application is a simulation game that gives players (typically students in Prof. de Vries' courses) an opportunity to learn about the [Tragedy of the Commons](https://en.wikipedia.org/wiki/Tragedy_of_the_commons).

This rewrite uses the new tech stack being developed for [CMPSC 156](https://ucsb-cs156.github.io).    This tech stack uses:
* Spring Boot (Java) for the backend
* React (JavaScript) for the frontend
* Spring Security plus Google OAuth for authentication/authorization
  - This last point is what distinguishes this tech stack from the one currently in use (as S21) for the three legacy code apps in
    CMPSC 156: the current apps use Auth0 with JWTs as the authentication/authorization mechanism.


The GitHub actions script to deploy the Storybook to QA requires some configuration; see [docs/github-actions.md](docs/github-actions.md) for details.

If these repos are not yet setup, see the setup steps in [`docs/storybook.md`](docs/storybook.md).

# Game Play for Developers

A description of how the game is played and what scheduled actions are run are given under [`docs/gamePlay.md`](docs/gamePlay.md)

# Environment Variables

For information on environment variables used in the app, refer to [docs/environment.md](docs/environment.md).

# Setup before running application

Before running the application for the first time,
you need to do the steps documented in [`docs/oauth.md`](docs/oauth.md).

Otherwise, when you try to login for the first time, you
will likely see an error such as:

<img src="https://user-images.githubusercontent.com/1119017/149858436-c9baa238-a4f7-4c52-b995-0ed8bee97487.png" alt="Authorization Error; Error 401: invalid_client; The OAuth client was not found." width="400"/>

# Getting Started on localhost

* Open *two separate terminal windows*  
* In the first window, start up the backend with:
  ```
  mvn spring-boot:run
  ```
* In the second window:
  ```
  cd frontend
  npm install  # only on first run or when dependencies change
  npm start
  ```

Then, the app should be available on <http://localhost:8080>

If it doesn't work at first, e.g. you have a blank page on  <http://localhost:8080>, give it a minute and a few page refreshes.  Sometimes it takes a moment for everything to settle in.

If you see the following on localhost, make sure that you also have the frontend code running in a separate window.

```
Failed to connect to the frontend server... On Dokku, be sure that PRODUCTION is defined.  On localhost, open a second terminal window, cd into frontend and type: npm install; npm start;
```

# Accessing swagger

To access the swagger API endpoints, use:

* <http://localhost:8080/swagger-ui/index.html>


# To run React Storybook

* cd into frontend
* use: npm run storybook
* This should put the storybook on http://localhost:6006
* Additional stories are added under frontend/src/stories

* For documentation on React Storybook, see: https://storybook.js.org/

# Accessing Database Console

* On localhost only: <http://localhost:8080/h2-console>  See also: [docs/h2-console.md](docs/h2-console.md)

# To Run Integration and End-to-end Tests

In order to run the integration and end-to-end test suite, using the following series of commands

```
mvn clean
INTEGRATION=true mvn test-compile
INTEGRATION=true mvn failsafe:integration-test
```

In order to run the end-to-end tests 'not headless' use the following instead of the last command.

```
INTEGRATION=true HEADLESS=false mvn failsafe:integration-test
```


# To Run Integration and End-to-end Tests

In order to run the integration and end-to-end test suite, using the following series of commands

```
mvn clean
INTEGRATION=true mvn test-compile
INTEGRATION=true mvn failsafe:integration-test
```

In order to run the end-to-end tests 'not headless' use the following instead of the last command.

```
INTEGRATION=true HEADLESS=false mvn failsafe:integration-test
```

# Partial pitest runs

This repo has support for partial pitest runs

For example, to run pitest on just one class, use:

```
mvn pitest:mutationCoverage -DtargetClasses=edu.ucsb.cs156.example.controllers.RestaurantsController
```

To run pitest on just one package, use:

```
mvn pitest:mutationCoverage -DtargetClasses=edu.ucsb.cs156.example.controllers.\*
```

To run full mutation test coverage, as usual, use:

```
mvn pitest:mutationCoverage
```
