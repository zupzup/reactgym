'use strict';
let Immutable = require('immutable'),
    folder = 'simplegym',
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
                        let reader = new FileReader();
                        reader.onloadend = (e) => {
                            let data = e.target.result;
                            if (data) {
                                cb(null, JSON.parse(data));
                            } else {
                                self.err('file parse error');
                            }
                        };
                        reader.readAsText(backupFile[0]);
                    } else {
                        self.err('no such file');
                    }
                }, self.err('entries'));
            }, self.err('dir'));
        }
    },

    getBackups(cb) {
        let self = this;
        if (window.requestFileSystem) {
            self.getDirectory((dirEntry) => {
                let reader = dirEntry.createReader();
                reader.readEntries((entries) => {
                    cb(null, Immutable.fromJS(entries).map((item) => {
                        return Immutable.fromJS({
                            label: item.get('name')
                        });
                    }));
                }, self.err('entries'));
            }, self.err('dir'));
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
                                cb(null, Immutable.fromJS(entries).map((item) => {
                                    return Immutable.fromJS({
                                        label: item.get('name')
                                    });
                                }));
                            }, self.err('entries'));
                        };
                        writer.write("Hello");
                        // writer.write(JSON.stringify(data));
                    }, self.err('writer'));
                }, self.err('createFile'));
            }, self.err('save'));
        }
    },

    getDirectory(cb, err) {
        let self = this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
            fs.root.getDirectory(folder, {create: true}, cb, err);
        }, self.err('fs'));
    },

    err(msg) {
        //TODO: fire FS-error event
        return function () {
            window.alert('[FAIL] ' + msg);
        };
    }
};

module.exports = BackupUtil;
