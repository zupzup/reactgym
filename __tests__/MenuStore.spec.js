'use strict';

var _ = require('lodash');

jest.dontMock('../scripts/stores/MenuStore.js');
jest.dontMock('object-assign');
jest.mock('../scripts/dispatcher/AppDispatcher.js');

describe("MenuStore", () => {
    let cb,
        MenuStore,
        AppDispatcher,
        ActionTypes = require('../scripts/constants/ActionTypes.js'),
        actionRequestMenuPoints = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.REQUEST_MENUPOINTS 
            }
        };

    beforeEach(() => {
        AppDispatcher = require('../scripts/dispatcher/AppDispatcher');
        MenuStore = require('../scripts/stores/MenuStore.js');
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    it("getMenuPoints", () => {
        var menuPoints = MenuStore.getMenuPoints();
        expect(menuPoints).toEqual([]);
    });

    it("requests menupoints", () => {
        cb(actionRequestMenuPoints);
        var menuPoints = MenuStore.getMenuPoints();
        expect(menuPoints.length).toEqual(4);
        expect(_.first(menuPoints).name).toEqual('Home');
    });
});

