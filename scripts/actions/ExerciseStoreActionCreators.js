'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    getExercises: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_EXERCISES
        });
    },
    addExercise: function(exercise) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_EXERCISE,
            exercise: exercise
        });
    },
    removeExercise: function(index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_EXERCISE,
            index: index
        });
    }
};
