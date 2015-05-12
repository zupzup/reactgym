'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import BackupUtil from '../utils/BackupUtil';
import ActionTypes from '../constants/ActionTypes';

/* istanbul ignore next */
module.exports = {
    getBackups() {
        AppDispatcher.handleViewAction({type: ActionTypes.GET_BACKUPS});
        BackupUtil.getBackups((err, data) => {
            if (!err) {
                AppDispatcher.handleViewAction({type: ActionTypes.GET_BACKUPS_SUCCESS, data});
            } else {
                AppDispatcher.handleViewAction({type: ActionTypes.GET_BACKUPS_FAIL, err});
            }
        });
    },

    addBackup(backup) {
        AppDispatcher.handleViewAction({type: ActionTypes.ADD_BACKUP});
        BackupUtil.saveBackup(backup, (err, data) => {
            if (!err) {
                AppDispatcher.handleViewAction({type: ActionTypes.ADD_BACKUP_SUCCESS, data});
            } else {
                AppDispatcher.handleViewAction({type: ActionTypes.ADD_BACKUP_FAIL, err});
            }
        });
    },

    restoreFromBackup(filename) {
        AppDispatcher.handleViewAction({type: ActionTypes.RESTORE_FROM_BACKUP});
        BackupUtil.getBackup(filename, (err, data) => {
            if (!err && data) {
                AppDispatcher.handleViewAction({type: ActionTypes.RESTORE_EXERCISES, data: data.exercises || []});
                AppDispatcher.handleViewAction({type: ActionTypes.RESTORE_WORKOUTS, data: data.workouts || []});
                AppDispatcher.handleViewAction({type: ActionTypes.RESTORE_TRAININGS, data: data.trainings || []});
                AppDispatcher.handleViewAction({type: ActionTypes.RESTORE_FROM_BACKUP_SUCCESS, data});
            } else {
                AppDispatcher.handleViewAction({type: ActionTypes.RESTORE_FROM_BACKUP_FAILURE, err});
            }
        });
    }
};
