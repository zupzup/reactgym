'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

/* istanbul ignore next */
module.exports = {
    getWorkouts() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_WORKOUTS
        });
    },
    addWorkout(workout) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_WORKOUT,
            workout
        });
    },
    removeWorkout(index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_WORKOUT,
            index
        });
    },
    updateWorkout(workout) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_WORKOUT,
            workout
        });
    },
    removeExerciseFromWorkouts(id) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_EXERCISE_FROM_WORKOUTS,
            id
        });
    }
};
