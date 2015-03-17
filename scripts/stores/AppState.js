'use strict';

let AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    assign = require('object-assign'),
    Immutable = require('immutable'),
    _nextTransition = 'slide',
    _modal = null,
    _menuOpen = false,
    _timerId = null,
    _activeTraining = null,
    _timerValue = null;

let vibrate = function() {
    /* istanbul ignore else  */
    if (navigator.notification) {
        navigator.notification.vibrate(1000);
    }
};

let AppState = assign({}, StoreListenerMixin, {
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
        if (_activeTraining == null) {
            _activeTraining = Immutable.fromJS(LocalStorageUtil.lsGet('activeTraining'));
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
    let action = payload.action;

    switch (action.type) {
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
            _activeTraining = Immutable.fromJS(action.training);
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
            _timerValue = action.restTimer;
            _timerId = window.setInterval(() => {
                if (_timerValue === 0) {
                    window.clearInterval(_timerId);
                    vibrate();
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
            _activeTraining = _activeTraining.updateIn(['sets', action.exercise],
                list => list.push(Immutable.fromJS(action.set)));
            LocalStorageUtil.lsSet('activeTraining', _activeTraining);
            AppState.emitChange();
            break;
        case ActionTypes.REMOVE_SET:
            _activeTraining = _activeTraining.updateIn(['sets', action.exercise], list => list.splice(action.index, 1));
            LocalStorageUtil.lsSet('activeTraining', _activeTraining);
            AppState.emitChange();
            break;
        case ActionTypes.SET_CURRENT_EXERCISE:
            _activeTraining = _activeTraining.setIn(['currentExercise'], action.exercise);
            LocalStorageUtil.lsSet('activeTraining', _activeTraining);
            AppState.emitChange();
            break;
        default:
    }
});

module.exports = AppState;
