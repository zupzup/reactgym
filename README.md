reactgym
========
Workout-Tracking app built using react and flux. Web and Native Android/iOS builds available

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

Demo:
------
TODO

TODOS:
* finish backups
    * Tests for Backups
    * warning, that active training gets canceled on data-change
    * loading indicator, failhandling for async actions (in LoadingStore)
* file-api / server-api for persistence
    * [PhoneGap File-API](http://docs.phonegap.com/en/edge/cordova_file_file.md.html)
    * [usage](https://gist.github.com/alunny/1904992)
    * create a common interface for file-api (native) and web-api
* native release builds (.ipa, .apk)
    * launch icon
    * conditionally include cordova

DONE:
------
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
* [x] rewrite List to take a handler-object with different handlers, then parse with lodash
* [x] crud for workouts (header-delete, header-add with a modal), WorkoutStore
    * [x] add - textfield, selectfield for exercises and submit/cancel, close on submit or cancel
    * [x] edit - add view with values, same functionality
    * [x] delete at list items
* trainings
    * [x] on clicking 'Training' -> if none active, training selection, otherwise go to trainings
    * [x] choose-workout-screen - list of workouts
    * [x] global timer starts for training, AppState - activeTraining {id}, TrainingStore
* [x] trainings
    * [x] list of exercises
        * [x] subview with reps for each exercise
            * [x] form with rep, weight, new
            * [x] timer for exercise
            * [x] delete for reps
    * [x] possibility to switch somewhere else while training is running
    * [x] End-training button with prompt
    * [x] global timer on home-page
    * [x] styling
* [x] form validation
* [x] tests for header
* [x] es6ify
* [x] tests for all stores
* [x] fix state-problem in AppState (addset/removeset etc. -> move activeTraining to AppState completely)
* [x] sass / compass instead of style.css :)
* [x] gulp build
* [x] tests for all utils
* [x] tests for all components
* [x] fix bug for exercise deletion (workouts are not updated)
* [x] tests for pages
* [x] bug with click handler (open menu, training buttons)
* [x] include PureRenderMixin
* [x] test App.js
* [x] form validation (training)
* [x] extend list with activeItem
* [x] remove stores boilerplate
    * [x] object.assign for add/remove/changeeventhandlers
* [x] persistence in localstorage
    * [x] ExerciseStore
    * [x] WorkoutStore
    * [x] AppState
    * [x] TrainingStore
* [x] BUG:currentExercise should be active on training-Start
* [x] include immutable.js
    * [x] rewrite tests to immutable
    * [x] AppState
    * [x] ExerciseStore
    * [x] WorkoutStore
    * [x] TrainingStore
* [x] training detail page
* [x] improve styling
    * [x] fill empty space on homepage
        * [x] recent training list -> detail on click
    * [x] modal forms, bigger buttons
    * [x] training page (timer, header, active marker for exercise)
    * [x] animate edit/delete buttons
    * [x] backbutton
    * [x] menubutton
    * [x] menu colors
* [x] fix doctype and styling issues
* [x] icons
* [x] do the rest of the icons
* [x] detail on workoutclick
* [x] fix animation problem on safari / iOS
* [x] fix click-event on iOS (cursor: pointer)
* [x] improved object literals
* [x] native build android / iOS
    * [x] build for android and iOS (configurable)
    * [x] trigger phonegap build
    * [x] copy js / css / images to www folder
* [x] fix history handling for native
* [x] fix iOS menu animation
* [x] add autoprefixer to sass
* [x] pre-fill reps/weight with last training's values
* [x] fix back onpopstate without historylocation
* [x] scroll focused input in position
* [x] fix side-scrolling issue
* [x] scroll top on modal-open
* [x] fix keyboard not shrinking the view on android
* [x] training-view scrollable exercises block
    * [x] scrollbars
    * [x] iOS
* [x] add training-duration (start-Date, end-Date)
* [x] transform icons to iconfont (ionicons)
* [x] platform-specific animations (slow ones for iOS)
    * [x] test on iPhone 4, 5, 6 if necessary
* [x] vibrate on timer-stop
* [x] check workout creation + training (are exercises correctly stored?)
* [x] create backup/restore view
    * [x] list of backups
        * [x] on click, open modal, restore y/n
    * [x] button "backup noew"
    * [x] BackupStore
* [x] Implement Settings-page (timer etc.)
* [x] deep-save trainings
* [x] Tests for Settings
* [x] use babel
* [x] when editing exercises / workouts -> update/cancel training
* [x] var -> let
* [x] upgrade to react .13
* [x] fix all eslint problems

