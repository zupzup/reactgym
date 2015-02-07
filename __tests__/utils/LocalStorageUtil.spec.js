'use strict';

jest.dontMock('../../scripts/utils/LocalStorageUtil.js');
var LocalStorageUtil = require('../../scripts/utils/LocalStorageUtil.js');
window.localStorage = {
    getItem: jest.genMockFunction().mockImplementation(() => {
        return '[]';
    }),
    setItem: jest.genMockFunction(),
    removeItem: jest.genMockFunction()
};
describe("LocalStorageUtil", () => {
    it("lsGet", () => {
        LocalStorageUtil.lsGet('hello');
        expect(window.localStorage.getItem.mock.calls.length).toBe(1);
        expect(window.localStorage.getItem.mock.calls[0][0]).toBe('sg_hello');
    });

    it("lsSet", () => {
        LocalStorageUtil.lsRemove('hello');
        expect(window.localStorage.removeItem.mock.calls.length).toBe(1);
        expect(window.localStorage.removeItem.mock.calls[0][0]).toBe('sg_hello');
    });

    it("lsRemove", () => {
        LocalStorageUtil.lsSet('hello', 'hola');
        expect(window.localStorage.setItem.mock.calls.length).toBe(1);
        expect(window.localStorage.setItem.mock.calls[0][0]).toBe('sg_hello');
        expect(window.localStorage.setItem.mock.calls[0][1]).toEqual('"hola"');
    });
});

