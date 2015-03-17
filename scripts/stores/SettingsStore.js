'use strict';

let AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    _ = require('lodash'),
    assign = require('object-assign'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    _restTimer = null;

let SettingsStore = assign({}, StoreListenerMixin, {
    getRestTimer() {
        if (_restTimer == null) {
            _restTimer = parseInt(LocalStorageUtil.lsGet('restTimer') || 90);
        }
        return _restTimer;
    }
});

SettingsStore.dispatchToken = AppDispatcher.register((payload) => {
    let action = payload.action;

    switch (action.type) {
        case ActionTypes.SET_REST_TIMER:
           _restTimer = parseInt(action.restTimer);
           if (_.isNaN(_restTimer)) {
               _restTimer = 0;
           }
           LocalStorageUtil.lsSet("restTimer", _restTimer);
           SettingsStore.emitChange();
           break;
        default:
    }
});

module.exports = SettingsStore;
