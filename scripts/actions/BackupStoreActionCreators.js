'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

/* istanbul ignore next */
module.exports = {
    getBackups() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_BACKUPS
        });
    },
    addBackup(backup) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_BACKUP,
            backup
        });
    },
    restoreFromBackup(index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.RESTORE_FROM_BACKUP,
            index
        });
    }
};
