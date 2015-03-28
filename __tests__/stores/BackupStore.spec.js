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

    afterEach(() => {
    });

    it("gets a list of Backups", () => {
        cb(getBackupsSuccessAction);
        var backup = BackupStore.getBackups();
        expect(backup.size).toEqual(2);
        expect(BackupStore.getLoading()).toBe(false);
    });

    it("shows a loading indicator when getting backups", () => {
        cb(getGetBackupsAction);
        expect(BackupStore.getLoading()).toBe(true);
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

