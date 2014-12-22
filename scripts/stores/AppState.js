'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _nextTransition = null;

var AppState = assign({}, EventEmitter.prototype, {

    init: function() {
        _nextTransition = 'slide';
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getNextTransition: function() {
        return this._nextTransition;
    }

});

AppState.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action) {
        case ActionTypes.SET_NEXT_TRANSITION:
           _nextTransition = payload.animation;
           AppState.emitChange();
           break;
        case ActionTypes.RESET_TRANSITION:
           _nextTransition = 'slide';
           AppState.emitChange();
           break;
        default: //do nothing 
    }
});

module.exports = AppState;
