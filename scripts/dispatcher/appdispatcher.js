var Dispatcher = require('flux').Dispatcher,
    PayloadSources = require('../constants/PayloadSources'),
    assign = require('object-assign'),
    AppDispatcher = assign(new Dispatcher(), {
        handleViewAction: function(action) {
            var payload = {
                source: PayloadSources.VIEW_ACTION,
                action: action
            };
            this.dispatch(payload);
        },

        handleServerAction: function(action) {
            var payload = {
                source: PayloadSources.SERVER_ACTION,
                action: action
            };
            this.dispatch(payload);
        }
    });

module.exports = AppDispatcher;
