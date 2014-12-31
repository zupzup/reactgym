'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    resetConfig: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.RESET_HEADER_CONFIG
        });
    },

    setConfig: function(config) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SET_HEADER_CONFIG,
            config: config
        });
    }
};
