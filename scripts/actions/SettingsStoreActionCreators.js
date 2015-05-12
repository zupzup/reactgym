'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/* istanbul ignore next */
module.exports = {
    setRestTimer(restTimer) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SET_REST_TIMER,
            restTimer
        });
    }
};
