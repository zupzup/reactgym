'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    addTraining: function(training) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_TRAINING,
            training: training
        });
    },

    removeTraining: function(index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_TRAINING,
            index: index 
        });
    }
};
