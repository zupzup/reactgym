'use strict';

jest.dontMock('../../scripts/stores/HeaderState.js');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');

describe("HeaderState", () => {
    let cb,
        HeaderState,
        AppDispatcher,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        setConfigAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.SET_HEADER_CONFIG,
                config: {
                    test: 'hello'
                }
            }
        },
        resetConfigAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.RESET_HEADER_CONFIG
            }
        };

    beforeEach(() => {
        jest.autoMockOn();
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        HeaderState = require('../../scripts/stores/HeaderState.js');
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    it("inits", () => {
        HeaderState.init()
        var config = HeaderState.getConfig();
        expect(Object.keys(config).length).toEqual(4);
    });

    it("getConfig", () => {
        var config = HeaderState.getConfig();
        expect(config).toEqual(null);
    });

    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null,{
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
    });

    it("set config", () => {
        cb(setConfigAction);
        var config = HeaderState.getConfig();
        expect(config.test).toEqual('hello');
    });

    it("reset config", () => {
        cb(setConfigAction);
        cb(resetConfigAction);
        var config = HeaderState.getConfig();
        expect(Object.keys(config).length).toEqual(4);
    });
});

