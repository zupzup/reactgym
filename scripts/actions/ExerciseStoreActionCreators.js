'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

/* istanbul ignore next */
module.exports = {
    getExercises() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_EXERCISES
        });
    },
    addExercise(exercise) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_EXERCISE,
            exercise: exercise
        });
    },
    updateExercise(exercise) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_EXERCISE,
            exercise: exercise
        });
    },
    removeExercise(index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_EXERCISE,
            index: index
        });
    }
};
