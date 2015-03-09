'use strict';
const prefix = 'sg_';
let LocalStorageUtil = {
    lsGet(key) {
        return JSON.parse(localStorage.getItem(prefix + key));
    },

    lsRemove(key) {
        localStorage.removeItem(prefix + key);
    },

    lsSet(key, value) {
        localStorage.setItem(prefix + key, JSON.stringify(value));
    }
};

module.exports = LocalStorageUtil;
