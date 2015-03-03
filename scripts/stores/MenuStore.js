'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    _menuPoints = [];

var MenuStore = assign({}, StoreListenerMixin, {
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
                    link: 'home',
                    icon: 'ion-home'
                },
                {
                    name: 'Exercises',
                    link: 'exercises',
                    icon: 'ion-clipboard'
                },
                {
                    name: 'Workouts',
                    link: 'workouts',
                    icon: 'ion-levels'
                },
                {
                    name: 'Training',
                    link: 'training',
                    icon: 'ion-ios-pulse'
                },
                {
                    name: 'Backup / Restore',
                    link: 'backup',
                    icon: 'ion-folder'
                },
                {
                    name: 'Settings',
                    link: 'settings',
                    icon: 'ion-ios-gear'
                }
            ];
            MenuStore.emitChange();
            break;
        default:
    }
});

module.exports = MenuStore;
