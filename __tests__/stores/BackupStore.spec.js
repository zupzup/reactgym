'use strict';

jest.dontMock('../../scripts/stores/BackupStore.js');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');

describe("BackupStore", () => {
    let cb,
        BackupStore,
        Immutable = require('immutable'),
        AppDispatcher,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        getGetBackupsAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.GET_BACKUPS
            }
        },
        getBackupsFailAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.GET_BACKUPS_FAIL
            }
        },
        getRestoreFailAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.RESTORE_FROM_BACKUP_FAILURE
            }
        },
        getRestoreSuccessAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.RESTORE_FROM_BACKUP_SUCCESS
            }
        },
        addBackupAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_BACKUP
            }
        },
        addBackupFailAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_BACKUP_FAIL
            }
        },
        addBackupSuccessAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_BACKUP_SUCCESS,
                data: Immutable.fromJS([
                    {
                        label: 'simplegym_2015-01-25'
                    },
                    {
                        label: 'simplegym_2015-01-24'
                    }
                ])
            }
        },
        restoreFromBackupAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.RESTORE_FROM_BACKUP
            }
        },
        getBackupsSuccessAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.GET_BACKUPS_SUCCESS,
                data: Immutable.fromJS([
                    {
                        label: 'simplegym_2015-01-25'
                    },
                    {
                        label: 'simplegym_2015-01-24'
                    }
                ])
            }
        };

    beforeEach(() => {
        jest.autoMockOn();
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        BackupStore = require('../../scripts/stores/BackupStore.js');
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    describe("adding backups", () => {
        it("shows a loading indicator when adding backups", () => {
            cb(addBackupAction);
            expect(BackupStore.getLoading()).toBe(true);
        });

        it("hides the loading indicator, when adding backups fails", () => {
            cb(addBackupFailAction);
            expect(BackupStore.getLoading()).toBe(false);
        });

        it("hides the loading indicator, and adds the backup if adding it was successful", () => {
            cb(addBackupSuccessAction);
            expect(BackupStore.getLoading()).toBe(false);
            expect(BackupStore.getBackups().size).toBe(2);
        });
    });

    describe("getting backups", () => {
        it("shows a loading indicator when getting backups", () => {
            cb(getGetBackupsAction);
            expect(BackupStore.getLoading()).toBe(true);
        });

        it("gets a list of Backups", () => {
            cb(getBackupsSuccessAction);
            var backup = BackupStore.getBackups();
            expect(backup.size).toEqual(2);
            expect(BackupStore.getLoading()).toBe(false);
        });

        it("hides the loading indicator, when getting backups fails", () => {
            cb(getBackupsFailAction);
            expect(BackupStore.getLoading()).toBe(false);
        });
    });

    describe("backup restore", () => {
        it("shows a loading indicator when restoring backups", () => {
            cb(restoreFromBackupAction);
            expect(BackupStore.getLoading()).toBe(true);
        });

        it("hides the loading indicator, when restoring backups fail", () => {
            cb(getRestoreFailAction);
            expect(BackupStore.getLoading()).toBe(false);
        });

        it("hides the loading indicator, when restoring backups was successfull", () => {
            cb(getRestoreSuccessAction);
            expect(BackupStore.getLoading()).toBe(false);
        });
    });


    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null, {
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
    });
});

