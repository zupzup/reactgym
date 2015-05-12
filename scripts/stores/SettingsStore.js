'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';
import assign from 'object-assign';
import LocalStorageUtil from '../utils/LocalStorageUtil.js';
import StoreListenerMixin from '../mixins/StoreListenerMixin.js';

let _restTimer = null;

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
