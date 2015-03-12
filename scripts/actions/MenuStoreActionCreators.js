'use strict';

let AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

/* istanbul ignore next */
module.exports = {
    getAllMenuPoints() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_MENUPOINTS
        });
    }
};
