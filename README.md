# Revature Swagg Shop
This repository holds the Angular project which serves as the client.

[Existing documentation can be found here.](https://github.com/revaturelabs/rss-documentation/wiki)

More detailed documentation will be needed as the project evolves.

---

### Angular Information

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

---

### Project Information

This project consists of several modules, most importantly: **Cart, Quiz, User, and Inventory**

### Common

The common component includes:
- a header component
- a breadcrumb service

### LandingPage

The LandingPage module includes:
- an authentication component
- a landing page component
- a login page component

### Cart

The cart module includes:
- the cart and cart item models
- the service associated with querying the cart backend server
- the select-cart component
- the shopping-cart component

### Quiz

The Quiz module includes:
- an Admin component
  - an edit quiz component
  - an add quiz component
  - a quiz view component
- an Employee component
  - a quiz process component
  - a review quiz component
  - a cheater component
- the service associated with querying the evaluation backend server
- the questions, quiz, quizSubmit, subject, and test-quiz-page-data models

### User

The User module includes:
- an Admin component
  - an admin inventory component
  - an admin page component
  - an admin quiz component
- the service associated with querying the account backend server
- the account and user models

### Inventory

The app-inventory module includes:
- the service associated with querying the inventory backend server
- the product model
- an add item component
- a confirmation modal component
- an inventory item component
- an inventory list component
- an user inventory item component


# ADDED DIR ./.github to accommodate github actions, at testing stage as of 05 NOV (mpp)
