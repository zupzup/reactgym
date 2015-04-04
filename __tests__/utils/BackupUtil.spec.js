'use strict';

jest.dontMock('../../scripts/utils/BackupUtil.js');
var BackupUtil = require('../../scripts/utils/BackupUtil.js');

LocalFileSystem = {
    PERSISTENT: null
};
window.requestFileSystem = (filesys, num, cb) => {
    let fs = {
        root: {
            getDirectory(folder, options, callback) {
                callback();
            }
        }
    };
    cb(fs);
};
window.alert = jest.genMockFunction();

describe("BackupUtil", () => {
    describe("getDirectory", () => {
        it("gets a directory and triggers the callback", () => {
            let cb = jest.genMockFunction();
            BackupUtil.getDirectory(cb, null);
            expect(cb.mock.calls.length).toBe(1);
        });
    });

    describe("err", () => {
        it("alerts [FAIL] with an error message", () => {
            BackupUtil.err('hello')();
            expect(window.alert.mock.calls.length).toBe(1);
        });
    });
});

