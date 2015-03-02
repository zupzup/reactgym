'use strict';
var Immutable = require('immutable'),
    folder = 'simplegym',
    prefix = 'simplegym_';

var BackupUtil = {
    getBackups(cb) {
        var self = this;
        if(window.requestFileSystem) {
            self.getDirectory((dirEntry) => {
                var reader = dirEntry.createReader();
                reader.readEntries((entries) => {
                    alert("got entries " + entries.length);
                    cb(null, entries);
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
        var self = this;
        if(window.requestFileSystem) {
            self.getDirectory((dirEntry) => {
                dirEntry.getFile(prefix + new Date().getTime().toString(), {create: true, exclusive: false}, (file) => {
                    alert(file.name);
                    file.createWriter((writer) => {
                        alert('got writer');
                        writer.onwriteend = (e) => {
                            dirEntry.createReader().readEntries((entries) => {
                                alert(entries.length);
                                alert(entries[0].name);
                                cb(null, entries);
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
    },

    getDirectory(cb, err) {
        var self = this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
            fs.root.getDirectory(folder, {create: true}, cb, err);
        }, self.err('fs'));
    },

    err(msg) {
        //TODO: fire FS-error event
        return function () {
            alert('[FAIL] ' + msg);
        };
    }
};

module.exports = BackupUtil;
