'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    getAllMenuPoints() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_MENUPOINTS
        });
    }
};
