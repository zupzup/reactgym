var Dispatcher = require('flux').Dispatcher,
    PayloadSources = require('../constants/PayloadSources'),
    assign = require('object-assign'),
    AppDispatcher = assign(new Dispatcher(), {
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
