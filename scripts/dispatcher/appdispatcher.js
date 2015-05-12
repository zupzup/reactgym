'use strict';

import {Dispatcher} from 'flux';
import PayloadSources from '../constants/PayloadSources';
import assign from 'object-assign';

const AppDispatcher = assign(new Dispatcher(), {
        handleViewAction(action) {
            var payload = {
                source: PayloadSources.VIEW_ACTION,
                action
            };
            this.dispatch(payload);
        },

        handleServerAction(action) {
            var payload = {
                source: PayloadSources.SERVER_ACTION,
                action
            };
            this.dispatch(payload);
        }
    });

module.exports = AppDispatcher;
