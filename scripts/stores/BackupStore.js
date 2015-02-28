'use strict';

var LocalStorageUtil = require('../utils/LocalStorageUtil'),
    ActionTypes = require('../constants/ActionTypes'),
    Immutable = require('immutable'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    BackupUtil = require('../utils/BackupUtil'),
    assign = require('object-assign'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin'),
    _backups = Immutable.List();

var BackupStore = assign({}, StoreListenerMixin, {
    getBackups() {
        return _backups;
    }
});

BackupStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.GET_BACKUPS:
            break;
        case ActionTypes.ADD_BACKUP:
            break;
        case ActionTypes.RESTORE_FROM_BACKUP:
            break;
        default:
    }
});

module.exports = BackupStore;

