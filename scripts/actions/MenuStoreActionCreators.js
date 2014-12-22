'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    getAllMenuPoints: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_MENUPOINTS
        });
    }
};
