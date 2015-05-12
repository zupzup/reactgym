'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

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
            exercise
        });
    },
    updateExercise(exercise) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_EXERCISE,
            exercise
        });
    },
    removeExercise(index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_EXERCISE,
            index
        });
    }
};
