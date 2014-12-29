reactgym
========

simple app for trying out react

#Setup:
* npm install
* npm start (starts a webpack server on localhost:3000)

#Structure:
simple menu on top with
* exercises
    * list of exercises, create/delete
        * name
* workouts (1:n exercises, add/remove)
    * name, list of exercises
* trainings
    * list of exercises, field for reps (number), field for weight (number), counter starts when 'save' is pressed

#TODOS:
* header manipulation from anywhere (mixin?)
    * buttons with handlers (predefined config: back, title, add, editMode)
    * defaultHandlers for back/title
    * HeaderStore for state, actions for changing state
* crud for exercises
* crud for workouts
* trainings
* sass / compass instead of style.css :)
* persistence in localstorage

#DONE:
* slide-menu [x]
* basic back-handling [x]
* nice sliding view-transitions [x]
* different animation for back [x]
* back-handling for '/' [x]
* mask for menu when it's open [x]
* refactor to flux
    * AppStateStore [x]
    * MenuStore, menupoints + open state
* Test Setup for jest (https://facebook.github.io/jest/docs/tutorial-react.html#content) [x]
* Some Proof of Concept-Tests with jest [x]
* List view [x]
