reactgym
========

Workout-Tracking app built in ES6 using react, flux and ImmutableJS. It runs on the Web as well as on Android/iOS using Phonegap.

Motivation
----------

I wrote this app to get more familiar with react development as a whole, including extensive unit testing using Jest. It is written completely
in ES6 and uses Immutable datastructures for all application state.
The application follows the flux pattern and has all the cool gadgets for productive development like webpack, eslint and react-hot-loader.

Demo:
------

* [demo](http://zupzup.github.io/reactgym/)

Features:
---------

* Creation of
    * Exercises
    * Workouts
    * Trainings
* Training History
* Rest-Timer
* Local Backup

Setup:
------

* npm install
* gulp (starts a webpack server)
* gulp test (runs tests and watches files)
* gulp prod (puts the runnable app in the www/ folder)

For native builds:
* npm install -g phonegap
* gulp phonegap (creates a phonegap app)
* gulp buildios (builds the app for iOS)
* gulp buildandroid (builds the app for Android)

Tech
---------

* Libs
    * react 0.13
    * react-router 0.13
    * ImmutableJS
    * Flux
* Build
    * gulp
    * eslint
    * babel
    * webpack
    * react-hot-loader
    * sass
    * phonegap
* Tests
    * Jest
    * Istanbul

