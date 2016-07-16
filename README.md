# CattleCrew Case Management UI

This is the CattleCrew Case Management UI source.

It is development with the [AngularJS](https://angularjs.org/) and uses [Grunt](http://gruntjs.com/) as build tool.

## Structure of this project

The structure is as follows:

* `app` - HTML, CSS and Javascript sources.
* `test` - Tests for the app sources.

## UI

This webapp provides an interface to interact with CMMN 1.1 models in the camunda BPM platform via REST API.

It is relying on the following libraries:

* __cmmn-js__: provides diagram rendering support for CMMN 1.1 models 

## Development

### Prerequisite

For this project you need [node.js](http://nodejs.org/) in version <= 4.4.7 with a npm version <= 3.10.5.
To ensure to have the an actual version of [npm](https://www.npmjs.com/) update globally using `npm install -g npm`.
You need to install [bower](https://bower.io/) globally using `npm install -g bower`.
You will also need to install [grunt](http://gruntjs.com/) globally using `npm install -g grunt grunt-cli`.
Optionally if you want to use a scaffolding tool for development you need to install [yeoman](http://yeoman.io/) globally using `npm install -g yo`.

The backend part is not in scope of this project but by default you need JDK 7+ and [Maven](https://maven.apache.org/) 3.2.1+.

### Setup

#### Adjusting Java Project (Backend)

See https://camunda.org/ and follow the instructions to

* setup an application server,
* create a BPM Project
* and add a CMMN 1.1 model. 

#### Using grunt

Installing the webapp is done by grunt:

```sh
# cd <path to your workspace>
git clone git@github.com:opitzconsulting/cattlecrew-case-management-ui.git
cd cattlecrew-case-management-ui
npm install
bower install
grunt
```

Finally the distribution will build in the `/dist` folder. 

To start a web-server for development, call

```sh
grunt serve
```

The webapp is then available pointing a browser at [http://localhost:9000](http://localhost:9000)

You can now start developing in the webapp directory.

#### Testing

Install the webapp with grunt and start the server. To run the tests, call

```sh
grunt test
```

## Browsers support

The supported browsers are:

- Chrome
- Firefox
- Internet Explorer 9+

## Contributing

You are __more than welcome__ to take part on the development of this project!

Clone the repository, add, fix or improve and send us a pull request.
But please take care about the commit messages.

You can submit issues in the [Issues](https://github.com/opitzconsulting/cattlecrew-case-management-ui/issues/).

In place of a guide, just follow the formatting of existing code (and / or use the [.editorconfig](http://editorconfig.org/) files provided).

## Help and support

* Have a look in the [Documentation](https://github.com/opitzconsulting/cattlecrew-case-management-ui/)
* Contact us via [e-mail](<halil.hancioglu@opitz-consulting.com>) 
* Visit our website [http://www.opitz-consulting.com/](http://www.opitz-consulting.com/) to get more detailed info about this project

## License

Unless otherwise specified this project is licensed under [Apache License Version 2.0](./LICENSE).

## Build Status

[![Build Status](https://travis-ci.org/opitzconsulting/cattlecrew-case-management-ui.svg?branch=master)](https://travis-ci.org/opitzconsulting/cattlecrew-case-management-ui)
