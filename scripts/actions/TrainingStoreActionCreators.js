'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    addTraining(training) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_TRAINING,
            training: training
        });
    },

    removeTraining(index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_TRAINING,
            index: index
        });
    }
};

