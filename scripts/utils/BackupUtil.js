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
                    cb(entries);
                    alert("got entries " + entries.length);
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
                dirEntry.getFile(prefix + new Date(), {create: true, exclusive: false}, (file) => {
                    dirEntry.createWriter((writer) => {
                        //TODO write file
                        writer.write(JSON.stringify(data));
                    }, self.err('writer'));
                }, self.err('createFile'));
            }, self.err('save'));
        } else {
            window.setTimeout(() => {
                cb(Immutable.fromJS([
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

    restoreFromBackup(index) {
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
