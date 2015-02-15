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
                    icon: 'styles/images/home.png'
                },
                {
                    name: 'Exercises',
                    link: 'exercises',
                    icon: 'styles/images/clipboard.png'
                },
                {
                    name: 'Workouts',
                    link: 'workouts',
                    icon: 'styles/images/levels.png'
                },
                {
                    name: 'Training',
                    link: 'training',
                    icon: 'styles/images/ios7-pulse.png'
                }
            ];
            MenuStore.emitChange();
            break;
        default:
    }
});

module.exports = MenuStore;
