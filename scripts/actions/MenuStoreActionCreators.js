'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/* istanbul ignore next */
module.exports = {
    getAllMenuPoints() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_MENUPOINTS
        });
    }
};
