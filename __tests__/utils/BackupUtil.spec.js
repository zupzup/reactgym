'use strict';

jest.dontMock('../../scripts/utils/BackupUtil.js');
var BackupUtil = require('../../scripts/utils/BackupUtil.js');

LocalFileSystem = {
    PERSISTENT: null
};

FileReader = function() {
    this.readAsText = () => {
        this.onloadend({
            target: {
                result: "{\"some\": \"data\"}"
            }
        });
    };
};

function setFileSystem() {
    window.requestFileSystem = (filesys, num, cb) => {
        let fs = {
            root: {
                getDirectory(folder, options, callback) {
                    let dirEntry = {
                        getFile(name, opts, filecb) {
                            let file = {
                                createWriter(createwritercb) {
                                    let writer = {
                                        write() {
                                            this.onwriteend();
                                        }
                                    };
                                    createwritercb(writer);
                                }
                            };
                            filecb(file);
                        },
                        createReader() {
                            return {
                                readEntries(entrycb) {
                                    let entries = [
                                        {
                                            name: 'someFile',
                                            file: (filecb) => {
                                                filecb();
                                            }
                                        },
                                        {
                                            name: 'anotherFile'
                                        }
                                    ];
                                    entrycb(entries);
                                }
                            };
                        }
                    };
                    callback(dirEntry);
                }
            }
        };
        cb(fs);
    };
}

window.alert = jest.genMockFunction();

describe("BackupUtil", () => {
    describe("getDirectory", () => {
        it("gets a directory and triggers the callback", () => {
            setFileSystem();
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

    describe("getBackup", () => {
        it("gets a specified file from the directory", () => {
            setFileSystem();
            let cb = jest.genMockFunction();
            BackupUtil.getBackup('someFile', cb);
            expect(cb.mock.calls.length).toBe(1);
            expect(cb.mock.calls[0][1].some).toBe("data");
        });

        it("does nothing if there is no filesystem", () => {
            window.requestFileSystem = null;
            let cb = jest.genMockFunction();
            BackupUtil.getBackup('someFile', cb);
            expect(cb.mock.calls.length).toBe(0);
        });

        it("shows an error if it can't find the file", () => {
            window.requestFileSystem = (filesys, num, cb) => {
                let fs = {
                    root: {
                        getDirectory(folder, options, callback) {
                            let dirEntry = {
                                createReader() {
                                    return {
                                        readEntries(entrycb) {
                                            let entries = [];
                                            entrycb(entries);
                                        }
                                    };
                                }
                            };
                            callback(dirEntry);
                        }
                    }
                };
                cb(fs);
            };
            let cb = jest.genMockFunction();
            BackupUtil.getBackup('someFile', cb);
            expect(cb.mock.calls.length).toBe(0);
            expect(window.alert.mock.calls.length).toBe(1);
        });

        it("shows an error if it can't parse the file", () => {
            setFileSystem();
            FileReader = function() {
                this.readAsText = () => {
                    this.onloadend({
                        target: {
                            result: null
                        }
                    });
                };
            };
            let cb = jest.genMockFunction();
            BackupUtil.getBackup('someFile', cb);
            expect(cb.mock.calls.length).toBe(0);
            expect(window.alert.mock.calls.length).toBe(1);
        });
    });

    describe("getBackups", () => {
        it("gets filenaems of all the files in a directory", () => {
            setFileSystem();
            let cb = jest.genMockFunction();
            BackupUtil.getBackups(cb);
            expect(cb.mock.calls.length).toBe(1);
            expect(cb.mock.calls[0][1].get(0).get('label')).toBe("someFile");
            expect(cb.mock.calls[0][1].get(1).get('label')).toBe("anotherFile");
        });

        it("does nothing if there is no filesystem", () => {
            window.requestFileSystem = null;
            let cb = jest.genMockFunction();
            BackupUtil.getBackups(cb);
            expect(cb.mock.calls.length).toBe(0);
        });
    });

    describe("saveBackup", () => {
        it("creates a new file and saves the backup", () => {
            setFileSystem();
            let cb = jest.genMockFunction();
            BackupUtil.saveBackup({some: "data"}, cb);
            expect(cb.mock.calls.length).toBe(1);
            expect(cb.mock.calls[0][1].get(0).get('label')).toBe("someFile");
        });

        it("does nothing if there is no filesystem", () => {
            window.requestFileSystem = null;
            let cb = jest.genMockFunction();
            BackupUtil.saveBackup({some: "data"}, cb);
            expect(cb.mock.calls.length).toBe(0);
        });
    });
});

