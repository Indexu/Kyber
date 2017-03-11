# Kyber

An Angular 2 REST storefront application.

## Features

* Sellers list
    * Name and category listing
    * Links to their own product page
    * Add/Edit sellers through a modal
* Seller details
    * Seller name, category and image
    * Product listing in 2 tabs
        * All products tab displays all of the seller's products
        * Top 10 tab displays the seller's top selling products
* Responsive layout
* Toast notifications
* Unit tested
    * 100% code coverage
* TSLint
    * Conforms with the default TSLint configuration for Angular 2
        * With the exception of us changing to double quotes
* Custom favicon
* This amazing README

## Getting Started

In order to run Kyber on your own machine, you will need [node.js](https://nodejs.org/en/download/) in order to use npm to install the dependencies and run the server.

### Prerequisites

#### Angular-CLI

Run the following command in order to start up the client.

```
$ sudo npm install -g angular-cli
```

#### Dependencies

Run the following command in the Kyber/src/client/ and Kyber/src/server/ folders.

```
$ npm install
```

### Running the server

You start up the server by running index.js, located in the Kyber/src/server/ directory, with node.
From the root directory of the project run the following command in your CLI.

```
$ node src/server/chatserver.js
```

Now the server is up and running on port 5000 by default.

### Starting up the client

You start up the client by using angular-cli
From the client folder of the project (Kyber/src/client/) run the following command in your CLI.

```
$ ng serve
```

Wait a bit while it starts up and afterwards the client is accessible via localhost:4200

### Development

We use the Angular-CLI as our build system which has webpack at it's core.

## Built With
* [Angular 2](https://angular.io/) - Framework
* [Bootstrap 4](https://material.angular.io/) ([ng-bootstrap](https://ng-bootstrap.github.io/)) - Styling and UI
* [Toastr](https://github.com/CodeSeven/toastr) ([ng2-toastr](https://github.com/PointInside/ng2-toastr)) - Toast notifications
* [ExpressJS](http://expressjs.com/) - Server
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Jasmine](https://jasmine.github.io/) - Unit testing framework
* [Karma](https://karma-runner.github.io/) - Test runner

## Authors

* [Christian A. Jacobsen](https://github.com/ChristianJacobsen/)
* [Hilmar Tryggvason](https://github.com/Indexu/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details