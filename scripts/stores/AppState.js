'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    assign = require('object-assign'),
    DEFAULT_TIMER = 90,
    _ = require('lodash'),
    _nextTransition = 'slide',
    _modal = null,
    _menuOpen = false,
    _timerId = null,
    _activeTraining = null,
    _timerValue = null;

var AppState = assign({}, StoreListenerMixin, {
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
        if(_activeTraining == null) {
            _activeTraining = LocalStorageUtil.lsGet('activeTraining');
        }
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
    }
});

AppState.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.SET_NEXT_TRANSITION:
           _nextTransition = action.animation;
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
            _modal = action.content;
            AppState.emitChange();
            break;
        case ActionTypes.CLOSE_MODAL:
            _modal = null;
            AppState.emitChange();
            break;
        case ActionTypes.START_TRAINING:
            _activeTraining = action.training;
            LocalStorageUtil.lsSet('activeTraining', _activeTraining);
            AppState.emitChange();
            break;
        case ActionTypes.FINISH_TRAINING:
            _activeTraining = null;
            LocalStorageUtil.lsRemove('activeTraining');
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
            _activeTraining.sets[action.exercise].push(action.set);
            LocalStorageUtil.lsSet('activeTraining', _activeTraining);
            AppState.emitChange();
            break;
        case ActionTypes.REMOVE_SET:
            _activeTraining.sets[action.exercise].splice(action.index, 1);
            LocalStorageUtil.lsSet('activeTraining', _activeTraining);
            AppState.emitChange();
            break;
        case ActionTypes.SET_CURRENT_EXERCISE:
            _activeTraining.currentExercise = action.exercise;
            LocalStorageUtil.lsSet('activeTraining', _activeTraining);
            AppState.emitChange();
            break;
        default:
    }
});

module.exports = AppState;
