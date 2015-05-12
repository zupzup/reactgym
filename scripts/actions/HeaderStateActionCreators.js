'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

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
            config
        });
    }
};
