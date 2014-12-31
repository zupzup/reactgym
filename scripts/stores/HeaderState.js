'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _config = null;

var HeaderState = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    init: function() {
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

    getConfig: function() {
        return _config;
    }
});

HeaderState.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.SET_HEADER_CONFIG:
           _config = payload.action.config;
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
