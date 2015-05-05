reactgym
========
Workout-Tracking app built using react and flux. Web and Native Android/iOS builds available

Tech
---------
* ImmutableJS
* Flux
* react-router

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
TODO GitHub Page Link

* Cleanup
* LocalStorage instability (sqlite)
* use npm jest
* GitHub page
* native release builds (.ipa, .apk)
    * launch icon
