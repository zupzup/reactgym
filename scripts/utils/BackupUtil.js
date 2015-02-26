
'use strict';
var Immutable = require('immutable'),
    folder = 'simplegym',
    prefix = 'simplegym_';
var BackupUtil = {
    getBackups() {
        var self = this;
        if(window.requestFileSystem) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
                var dir = fs.root.getDirectory(folder, {create: true}, (dirEntry) => {
                    alert("directory created " + dirEntry.name);
                    var reader = dirEntry.createReader();
                    reader.readEntries((entries) => {
                        alert("got entries " + entries.length);
                    }, self.err('entries'));
                }, self.err('dir'));
            }, self.err('fs'));
        } else {
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
    },

    restoreFromBackup(index) {
    },

    err(msg) {
        return function () {
            alert('[FAIL] ' + msg);
        };
    }
};

module.exports = BackupUtil;
