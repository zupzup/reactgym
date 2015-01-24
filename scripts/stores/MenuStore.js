'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _menuPoints = [];

var MenuStore = assign({}, EventEmitter.prototype, {

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getMenuPoints() {
        return _menuPoints;
    }

});

MenuStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.REQUEST_MENUPOINTS:
            _menuPoints = [
                {
                    name: 'Home',
                    link: 'home'
                },
                {
                    name: 'Exercises',
                    link: 'exercises'
                },
                {
                    name: 'Workouts',
                    link: 'workouts'
                },
                {
                    name: 'Training',
                    link: 'training'
                }
            ];
            MenuStore.emitChange();
            break;
        default:
    }
});

module.exports = MenuStore;
