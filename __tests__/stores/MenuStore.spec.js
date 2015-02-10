'use strict';

jest.dontMock('../../scripts/stores/MenuStore.js');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');

describe("MenuStore", () => {
    let cb,
        MenuStore,
        AppDispatcher,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        actionRequestMenuPoints = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.REQUEST_MENUPOINTS 
            }
        };

    beforeEach(() => {
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        MenuStore = require('../../scripts/stores/MenuStore.js');
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    it("getMenuPoints", () => {
        var menuPoints = MenuStore.getMenuPoints();
        expect(menuPoints).toEqual([]);
    });

    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null,{
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
    });

    it("requests menupoints", () => {
        cb(actionRequestMenuPoints);
        var menuPoints = MenuStore.getMenuPoints();
        expect(menuPoints.length).toEqual(4);
        expect(menuPoints[0].name).toEqual('Home');
    });
});

