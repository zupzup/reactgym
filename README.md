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
* crud for exercises (header-delete, header-add with a modal)
* crud for workouts (header-delete, header-add with a modal)
* trainings
* sass / compass instead of style.css :)
* persistence in localstorage

#DONE:
* [ ] slide-menu
* [ ] basic back-handling
* [ ] nice sliding view-transitions
* [ ] different animation for back
* [ ] back-handling for '/'
* [ ] mask for menu when it's open
* [ ] refactor to flux
    * [ ] AppStateStore
    * [ ] MenuStore, menupoints + open state
* [ ] Test Setup for jest (https://facebook.github.io/jest/docs/tutorial-react.html#content)
* [ ] Some Proof of Concept-Tests with jest
* [ ] List view
* [ ] header manipulation from anywhere (mixin?)
    * [ ] buttons with handlers (predefined config: back, title, add, editMode)
    * [ ] defaultHandlers for back/title
    * [ ] HeaderStore for state, actions for changing state
* [ ] remove warnings and bugs with home and transitions
    * [ ] going back to home error if not started there
    * [ ] transition-warning
    * [ ] nextTransition without timeout
* [ ] modal
    * [ ] via event, AppState
    * [ ] globally reachable
    * [ ] pass in content-component to render
    * [ ] animate modal
    * [ ] add modal to App.js

