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

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getNextTransition() {
        return _nextTransition;
    },

    getMenuOpen() {
        return _menuOpen;
    },

    getModal() {
        return _modal; 
    },

    getActiveTraining() {
        return _activeTraining;
    },

    getTimer() {
        return _timerValue;
    },

    getAll() {
        return {
            nextTransition: _nextTransition,
            menuOpen: _menuOpen,
            modal: _modal
        };
    },

    getCurrentExercise() {
        return _activeTraining.currentExercise;
    }
});

AppState.dispatchToken = AppDispatcher.register((payload) => {
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
            window.clearInterval(_timerId);
            _timerValue = DEFAULT_TIMER;
            _timerId = window.setInterval(() => {
                if(_timerValue === 0) {
                    window.clearInterval(_timerId);
                    _timerValue = null;
                    AppState.emitChange();
                    return;
                }
                _timerValue -= 1;
                AppState.emitChange();
            }, 1000);
            AppState.emitChange();
            break;
        case ActionTypes.STOP_TIMER:
            window.clearInterval(_timerId);
            _timerValue = null;
            AppState.emitChange();
            break;
        case ActionTypes.ADD_SET:
            var activeTraining = TrainingStore.getTrainingForId(_activeTraining);
            activeTraining.sets[payload.action.exercise].push(payload.action.set);
            AppState.emitChange();
            break;
        case ActionTypes.REMOVE_SET:
            var activeTraining = TrainingStore.getTrainingForId(_activeTraining);
            activeTraining.sets[payload.action.exercise].splice(payload.action.index, 1);
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
