'use strict';

let AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

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

