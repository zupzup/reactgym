'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import assign from 'object-assign';
import StoreListenerMixin from '../mixins/StoreListenerMixin.js';

let _menuPoints = [];

let MenuStore = assign({}, StoreListenerMixin, {
    getMenuPoints() {
        return _menuPoints;
    }
});

MenuStore.dispatchToken = AppDispatcher.register((payload) => {
    let action = payload.action;

    switch (action.type) {
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
