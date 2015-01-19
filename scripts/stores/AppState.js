'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    TrainingStore = require('./TrainingStore'),
    DEFAULT_TIMER = 90,
    _ = require('lodash'),
    CHANGE_EVENT = 'change',
    _nextTransition = 'slide',
    _modal = null,
    _menuOpen = false,
    _timerId = null,
    _timerValue = null,
    _activeTraining = null;

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

    getActiveTraining: function() {
        return _activeTraining;
    },

    getTimer: function() {
        return _timerValue;
    },

    getAll: function() {
        return {
            nextTransition: _nextTransition,
            menuOpen: _menuOpen,
            modal: _modal
        };
    },

    getCurrentExercise: function() {
        return _activeTraining.currentExercise;
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
        case ActionTypes.START_TRAINING:
            _activeTraining = payload.action.id;
            AppState.emitChange();
            break;
        case ActionTypes.FINISH_TRAINING:
            _activeTraining = null;
            AppState.emitChange();
            break;
        case ActionTypes.START_TIMER:
            _timerValue = DEFAULT_TIMER;
            _timerId = window.setInterval(function() {
                if(_timerValue === 0) {
                    window.clearInterval(_timerId);
                    return;
                }
                _timerValue -= 1; 
                AppState.emitChange();
            }, 1000);
            AppState.emitChange();
            break;
        case ActionTypes.STOP_TIMER:
            window.clearInterval(_timerId);
            AppState.emitChange();
            break;
        case ActionTypes.ADD_SET:
            var activeTraining = TrainingStore.getTrainingForId(_activeTraining);
            activeTraining.sets[payload.action.exercise].push(payload.action.set);
            AppState.emitChange();
            break;
        case ActionTypes.SET_CURRENT_EXERCISE:
            var activeTraining = TrainingStore.getTrainingForId(_activeTraining);
            activeTraining.currentExercise = payload.action.exercise;
            AppState.emitChange();
            break;
        default:
    }
});

module.exports = AppState;
