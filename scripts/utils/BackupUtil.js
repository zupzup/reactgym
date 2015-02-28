'use strict';
var Immutable = require('immutable'),
    folder = 'simplegym',
    prefix = 'simplegym_';
var BackupUtil = {
    getBackups() {
        var self = this;
        if(window.requestFileSystem) {
            self.getDirectory((dirEntry) => {
                var reader = dirEntry.createReader();
                reader.readEntries((entries) => {
                    //TODO: fire gotEntries event
                    alert("got entries " + entries.length);
                }, self.err('entries'));
            }, self.err('dir'));
        } else {
            //TODO: fire gotEntries event with data
            return Immutable.fromJS([
                {
                    label: 'simplegym_2015-01-25'
                },
                {
                    label: 'simplegym_2015-01-24'
                }
            ]);
        }
    },

    saveBackup(data) {
        var self = this;
        self.getDirectory((dirEntry) => {
            dirEntry.getFile(prefix + new Date(), {create: true, exclusive: false}, (file) => {
                dirEntry.createWriter((writer) => {
                    //TODO write file
                    writer.write(JSON.stringify(data));
                }, self.err('writer'));
            }, self.err('createFile'));
        }, self.err('save'));
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
