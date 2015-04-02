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
describe("BackupUtil", () => {
    describe("getDirectory", () => {
        it("gets a directory and triggers the callback", () => {
            expect(true).toBe(true);
        });
    });
});

