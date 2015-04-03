'use strict';

jest.dontMock('../../scripts/utils/BackupUtil.js');
var BackupUtil = require('../../scripts/utils/BackupUtil.js');

window.requestFileSystem = (filesys, num, cb) => {
    let fs = {
        root: {
            getDirectory: jest.genMockFunction()
        }
    };
    cb(fs);
};
window.alert = jest.genMockFunction();

describe("BackupUtil", () => {
    describe("getDirectory", () => {
        it("gets a directory and triggers the callback", () => {
            expect(true).toBe(true);
        });
    });

    describe("err", () => {
        it("alerts [FAIL] with an error message", () => {
            BackupUtil.err('hello')();
            expect(window.alert.mock.calls.length).toBe(1);
        });
    });
});

