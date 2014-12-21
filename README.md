reactgym
========

simple app for trying out react

#Setup:
* npm install
* npm start (starts a webpack server on localhost:3000)
* npm tests (runs jest tests)

#Structure:
simple menu on top with
* exercises
    * name
* workouts (1:n exercises)
* trainings
    * list of exercises, field for reps (number), field for weight (number), counter starts when 'save' is pressed

#TODOS:
* mask for menu when it's open
* back-handling for '/', cleaner way to register back animation
    * refactor to flux? AppStateStore maybe?
* fake-crud for exercises
* fake crud for workouts
* trainings
* sass / compass instead of style.css :)
* persistence in localstorage

#DONE:
* slide-menu [x]
* basic back-handling [x]
* nice sliding view-transitions [x]
* different animation for back [x]
* back-handling for '/' [x]
