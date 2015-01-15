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
* trainings
    * [x] on clicking 'Training' -> if none active, training selection, otherwise go to trainings
    * choose-training-screen - list of trainings
    * global timer starts for training, AppState - activeTraining {id}, TrainingStore
    * list of exercises
        * subview with reps for each exercise
            * form with rep, weight, new
            * delete for reps
            * timer for exercise
    * End-training button with prompt
* persistence in localstorage
* es6ify
* RxJS-ify
* sass / compass instead of style.css :)

#DONE:
* [x] slide-menu
* [x] basic back-handling
* [x] nice sliding view-transitions
* [x] different animation for back
* [x] back-handling for '/'
* [x] mask for menu when it's open
* [x] refactor to flux
    * [x] AppStateStore
    * [x] MenuStore, menupoints + open state
* [x] Test Setup for jest (https://facebook.github.io/jest/docs/tutorial-react.html#content)
* [x] Some Proof of Concept-Tests with jest
* [x] List view
* [x] header manipulation from anywhere (mixin?)
    * [x] buttons with handlers (predefined config: back, title, add, editMode)
    * [x] defaultHandlers for back/title
    * [x] HeaderStore for state, actions for changing state
* [x] remove warnings and bugs with home and transitions
    * [x] going back to home error if not started there
    * [x] transition-warning
    * [x] nextTransition without timeout
* [x] modal
    * [x] via event, AppState
    * [x] globally reachable
    * [x] pass in content-component to render
    * [x] animate modal
    * [x] add modal to App.js
* crud for exercises (header-delete, header-add with a modal), ExerciseStore [x]
    * [x] add - textfield and submit/cancel, close on submit or cancel
    * [x] delete at list items
* [x] ListItem - multiple nested clickHandlers
* [x] rewrite List to take an handler-object with different handlers, then parse with lodash
* [x] crud for workouts (header-delete, header-add with a modal), WorkoutStore
    * [x] add - textfield, selectfield for exercises and submit/cancel, close on submit or cancel
    * [x] edit - add view with values, same functionality
    * [x] delete at list items

