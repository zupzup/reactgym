'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

/* istanbul ignore next */
module.exports = {
    resetConfig() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.RESET_HEADER_CONFIG
        });
    },

    setConfig(config) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SET_HEADER_CONFIG,
            config: config
        });
    }
};
