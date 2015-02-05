'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    _ = require('lodash'),
    assign = require('object-assign'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    _exercises = [];

var ExerciseStore = assign({}, StoreListenerMixin, {
    getExerciseForId(id) {
        return _.first(_exercises.filter((exercise) => {
            return exercise.id === id; 
        }));
    },

    getExercises() {
        return _exercises;
    }
});

ExerciseStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.GET_EXERCISES:
            _exercises = [
                {
                    id: 1,
                    label: 'T-Bar-Rows'
                },
                {
                    id: 2,
                    label: 'Hammercurls'
                },
                {
                    id: 3,
                    label: 'Butterfly'
                }
            ];
            ExerciseStore.emitChange();
            break;
        case ActionTypes.ADD_EXERCISE:
            _exercises.push({
                    id: _exercises.map((item) => {
                        return item.id + 1;
                    }).reduce((acc, item) => {
                        return item;
                    }, 0),
                    label: payload.action.exercise
                });
            ExerciseStore.emitChange();
            break;
        case ActionTypes.REMOVE_EXERCISE:
            _exercises.splice(payload.action.index, 1);
            ExerciseStore.emitChange();
            break;
        default:
    }
});

module.exports = ExerciseStore;
