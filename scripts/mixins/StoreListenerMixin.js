'use strict';
var assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    EventEmitter = require('events').EventEmitter;

var StoreListenerMixin = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
});

module.exports = StoreListenerMixin;
