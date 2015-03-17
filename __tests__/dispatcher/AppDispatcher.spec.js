'use strict';

jest.dontMock('../../scripts/dispatcher/AppDispatcher.js');
var AppDispatcher = require('../../scripts/dispatcher/AppDispatcher.js'),
    PayloadSources = require('../../scripts/constants/PayloadSources');

describe("AppDispatcher", () => {
    it("handlers view actions", () => {
        AppDispatcher.dispatch = jest.genMockFunction();
        AppDispatcher.handleViewAction('hello');
        expect(AppDispatcher.dispatch.mock.calls.length).toBe(1);
        expect(AppDispatcher.dispatch.mock.calls[0][0].source).toEqual(PayloadSources.VIEW_ACTION);
        expect(AppDispatcher.dispatch.mock.calls[0][0].action).toEqual('hello');
    });

    it("handlers server actions", () => {
        AppDispatcher.dispatch = jest.genMockFunction();
        AppDispatcher.handleServerAction('hello');
        expect(AppDispatcher.dispatch.mock.calls.length).toBe(1);
        expect(AppDispatcher.dispatch.mock.calls[0][0].source).toEqual(PayloadSources.SERVER_ACTION);
        expect(AppDispatcher.dispatch.mock.calls[0][0].action).toEqual('hello');
    });
});
