'use strict';
let assign = require('object-assign'),
    EventEmitter = require('events').EventEmitter;
const CHANGE_EVENT = 'change';

let StoreListenerMixin = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

module.exports = StoreListenerMixin;
