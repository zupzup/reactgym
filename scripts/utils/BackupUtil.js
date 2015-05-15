'use strict';

import Immutable from 'immutable';

let folder = 'simplegym',
    prefix = 'simplegym_';

let BackupUtil = {
    getBackup(filename, cb) {
        let self = this;
        if (window.requestFileSystem) {
            self.getDirectory((dirEntry) => {
                let reader = dirEntry.createReader();
                reader.readEntries((entries) => {
                    let backupFile = entries.filter((entry) => {
                        return entry.name === filename;
                    });
                    if (backupFile && backupFile.length > 0) {
                        let fileEntry = backupFile[0];
                        fileEntry.file((file) => {
                            let freader = new FileReader();
                            freader.onloadend = (e) => {
                                let data = e.target.result;
                                if (data) {
                                    cb(null, JSON.parse(data));
                                } else {
                                    self.err('Error Parsing File')();
                                }
                            };
                            freader.readAsText(file);
                        }, self.err('Error reading the File'));
                    } else {
                        self.err('There is no such file')();
                    }
                }, self.err('Error reading Directory'));
            }, self.err('dir'));
        }
    },

    getBackups(cb) {
        let self = this;
        if (window.requestFileSystem) {
            self.getDirectory((dirEntry) => {
                let reader = dirEntry.createReader();
                reader.readEntries((entries) => {
                    let fileNames = entries.map((item) => {
                        return {
                            label: item.name
                        };
                    });
                    cb(null, Immutable.fromJS(fileNames));
                }, self.err('Error reading Files'));
            }, self.err('Error reading Directory'));
        }
    },

    saveBackup(data, cb) {
        let self = this;
        if (window.requestFileSystem) {
            self.getDirectory((dirEntry) => {
                dirEntry.getFile(prefix + new Date().getTime().toString(), {create: true, exclusive: false}, (file) => {
                    file.createWriter((writer) => {
                        writer.onwriteend = () => {
                            dirEntry.createReader().readEntries((entries) => {
                                let fileNames = entries.map((item) => {
                                    return {
                                        label: item.name
                                    };
                                });
                                cb(null, Immutable.fromJS(fileNames));
                            }, self.err('Error reading Directory'));
                        };
                        writer.write(JSON.stringify(data));
                    }, self.err('Error writing File'));
                }, self.err('Error creating File'));
            }, self.err('Error saving File'));
        }
    },

    getDirectory(cb, err) {
        let self = this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
            fs.root.getDirectory(folder, {create: true}, cb, err);
        }, self.err('Error accessing the FileSystem'));
    },

    err(msg) {
        return function () {
            window.alert('[ERROR] ' + msg);
        };
    }
};

module.exports = BackupUtil;
