'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    _config = null;

var HeaderState = assign({}, StoreListenerMixin, {
    init() {
        _config = {
            back: true,
            title: {
                visible: true,
                text: 'SimpleGym'
            },
            add: {
                visible: false,
                handler: null
            },
            editMode: {
                visible: false,
                handler: null
            }
        };
    },

    getConfig() {
        return _config;
    }
});

HeaderState.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.SET_HEADER_CONFIG:
           _config = action.config;
           HeaderState.emitChange();
           break;
        case ActionTypes.RESET_HEADER_CONFIG:
           HeaderState.init();
           HeaderState.emitChange();
           break;
        default:
    }
});

module.exports = HeaderState;
