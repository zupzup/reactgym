'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _nextTransition = 'slide',
    _modal = null,
    _menuOpen = false;

var AppState = assign({}, EventEmitter.prototype, {

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
        return _nextTransition;
    },

    getMenuOpen: function() {
        return _menuOpen;
    },

    getModal: function() {
        return _modal; 
    },

    getAll: function() {
        return {
            nextTransition: _nextTransition,
            menuOpen: _menuOpen,
            modal: _modal
        };
    }

});

AppState.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.SET_NEXT_TRANSITION:
           _nextTransition = payload.action.animation;
           AppState.emitChange();
           break;
        case ActionTypes.RESET_TRANSITION:
           _nextTransition = 'slide';
           AppState.emitChange();
           break;
        case ActionTypes.TOGGLE_MENU:
            _menuOpen = !_menuOpen;
            AppState.emitChange();
            break;
        case ActionTypes.CLOSE_MENU:
            _menuOpen = false;
            AppState.emitChange();
            break;
        case ActionTypes.OPEN_MODAL:
            _modal = payload.action.content;
            AppState.emitChange();
            break;
        case ActionTypes.CLOSE_MODAL:
            _modal = null;
            AppState.emitChange();
            break;
        default:
    }
});

module.exports = AppState;
