'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

/* istanbul ignore next */
module.exports = {
    setRestTimer(restTimer) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SET_REST_TIMER,
            restTimer
        });
    }
};
