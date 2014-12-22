
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    setNextTransition: function(animation) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SET_NEXT_TRANSITION,
            animation: animation
        });
    },

    resetTransitions: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.RESET_TRANSITION,
            animation: 'slide'
        });
    }
};
