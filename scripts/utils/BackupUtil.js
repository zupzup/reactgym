'use strict';
let Immutable = require('immutable'),
    folder = 'simplegym',
    prefix = 'simplegym_';

let BackupUtil = {
    getBackup(filename, cb) {
        //TODO implement
        window.setTimeout(() => {
            cb(null, Immutable.fromJS([
                {
                    label: 'simplegym_2015-01-24'
                }
            ]));
        }, 500);
    },

    getBackups(cb) {
        let self = this;
        if (window.requestFileSystem) {
            self.getDirectory((dirEntry) => {
                let reader = dirEntry.createReader();
                reader.readEntries((entries) => {
                    cb(null, Immutable.fromJS(entries).map((item) => {
                        return {
                            label: item.name
                        };
                    }));
                }, self.err('entries'));
            }, self.err('dir'));
        } else {
            window.setTimeout(() => {
                cb(null, Immutable.fromJS([
                    {
                        label: 'simplegym_2015-01-25'
                    },
                    {
                        label: 'simplegym_2015-01-24'
                    }
                ]));
            }, 500);
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
                                    return {
                                        label: item.name
                                    };
                                }));
                            }, self.err('entries'));
                        };
                        writer.write("Hello");
                        // writer.write(JSON.stringify(data));
                    }, self.err('writer'));
                }, self.err('createFile'));
            }, self.err('save'));
        } else {
            window.setTimeout(() => {
                cb(null, Immutable.fromJS([
                    {
                        label: 'simplegym_2015-01-25'
                    },
                    {
                        label: 'simplegym_2015-01-24'
                    },
                    {
                        label: 'simplegym_2015-01-27'
                    }
                ]));
            }, 500);
        }
    },

    restoreFromBackup(filename, cb) {
        window.console.log(filename, cb);
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
