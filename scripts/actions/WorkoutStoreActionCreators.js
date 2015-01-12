'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    getWorkouts: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_WORKOUTS
        });
    },
    addWorkout: function(workout) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_WORKOUT,
            workout: workout
        });
    },
    removeWorkout: function(index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_WORKOUT,
            index: index
        });
    },
    updateWorkout: function(workout) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_WORKOUT,
            workout: workout
        });
    }
};
