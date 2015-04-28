'use strict';

let ActionTypes = require('../constants/ActionTypes'),
    Immutable = require('immutable'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    assign = require('object-assign'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin'),
    _loading = false,
    _backups = Immutable.List();

let BackupStore = assign({}, StoreListenerMixin, {
    getBackups() {
        return _backups;
    },

    getLoading() {
        return _loading;
    }
});

BackupStore.dispatchToken = AppDispatcher.register((payload) => {
    let action = payload.action;

    switch (action.type) {
        case ActionTypes.GET_BACKUPS:
            _loading = true;
            BackupStore.emitChange();
            break;
        case ActionTypes.GET_BACKUPS_FAIL:
            _loading = false;
            BackupStore.emitChange();
            break;
        case ActionTypes.GET_BACKUPS_SUCCESS:
            _loading = false;
            _backups = Immutable.fromJS(action.data);
            BackupStore.emitChange();
            break;
        case ActionTypes.ADD_BACKUP:
            _loading = true;
            BackupStore.emitChange();
            break;
        case ActionTypes.ADD_BACKUP_SUCCESS:
            _loading = false;
            _backups = Immutable.fromJS(action.data);
            BackupStore.emitChange();
            break;
        case ActionTypes.ADD_BACKUP_FAIL:
            _loading = false;
            BackupStore.emitChange();
            break;
        case ActionTypes.RESTORE_FROM_BACKUP:
            _loading = true;
            break;
        case ActionTypes.RESTORE_FROM_BACKUP_SUCCESS:
            _loading = false;
            BackupStore.emitChange();
            break;
        case ActionTypes.RESTORE_FROM_BACKUP_FAILURE:
            _loading = false;
            break;
        default:
    }
});

module.exports = BackupStore;

