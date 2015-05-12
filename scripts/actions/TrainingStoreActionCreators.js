'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/* istanbul ignore next */
module.exports = {
    addTraining(training) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_TRAINING,
            training
        });
    },

    removeTraining(index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_TRAINING,
            index
        });
    }
};
