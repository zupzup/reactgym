'use strict';

jest.dontMock('../../scripts/stores/SettingsStore.js');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');
jest.mock('../../scripts/utils/LocalStorageUtil.js');

describe("SettingsStore", () => {
    let cb,
        SettingsStore,
        LocalStorageUtil,
        AppDispatcher,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        setRestTimerAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.SET_REST_TIMER,
                restTimer: 50
            }
        },
        setNaNRestTimerAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.SET_REST_TIMER,
                restTimer: "bla"
            }
        };

    beforeEach(() => {
        jest.autoMockOn();
        LocalStorageUtil = require('../../scripts/utils/LocalStorageUtil.js');
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        SettingsStore = require('../../scripts/stores/SettingsStore.js');
        LocalStorageUtil.lsGet.mockImplementation(() => {
            return null;
        });
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    afterEach(() => {
        LocalStorageUtil.lsGet.mockClear();
        LocalStorageUtil.lsSet.mockClear();
    });

    it("is 90 by default", () => {
        var restTimer = SettingsStore.getRestTimer();
        expect(restTimer).toEqual(90);
    });

    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null,{
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
    });

    it("sets the restTimer", () => {
        cb(setRestTimerAction);
        var restTimer = SettingsStore.getRestTimer();
        expect(restTimer).toEqual(50);
    });
    it("sets the restTimer to 0 if there is an invalid value", () => {
        cb(setNaNRestTimerAction);
        var restTimer = SettingsStore.getRestTimer();
        expect(restTimer).toEqual(0);
    });
});

