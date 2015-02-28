'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

/* istanbul ignore next */
module.exports = {
    getBackups() {
        //TODO: show loading indicator
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_BACKUPS
        });
    },
    addBackup(backup) {
        //TODO: show loading indicator
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_BACKUP,
            backup
        });
    },
    restoreFromBackup(index) {
        //TODO: show loading indicator
        AppDispatcher.handleViewAction({
            type: ActionTypes.RESTORE_FROM_BACKUP,
            index
        });
    }
};
