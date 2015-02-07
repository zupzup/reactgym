'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    _ = require('lodash'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    assign = require('object-assign'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js');

var ExerciseStore = assign({}, StoreListenerMixin, {
    getExerciseForId(id) {
        return _.first(LocalStorageUtil.lsGet('exercises').filter((exercise) => {
            return exercise.id === id; 
        }));
    },

    getExercises() {
        return LocalStorageUtil.lsGet('exercises');
    }
});

ExerciseStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.GET_EXERCISES:
            var exercises = LocalStorageUtil.lsGet('exercises');
            if(exercises == null) {
                LocalStorageUtil.lsSet('exercises', [
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
                ]);
                ExerciseStore.emitChange();
            }
            break;
        case ActionTypes.ADD_EXERCISE:
            var exercises = LocalStorageUtil.lsGet('exercises');
            exercises.push({
                    id: exercises.map((item) => {
                        return item.id + 1;
                    }).reduce((acc, item) => {
                        return item;
                    }, 0),
                    label: payload.action.exercise
                });
            LocalStorageUtil.lsSet('exercises', exercises);
            ExerciseStore.emitChange();
            break;
        case ActionTypes.REMOVE_EXERCISE:
            var exercises = LocalStorageUtil.lsGet('exercises');
            exercises.splice(payload.action.index, 1);
            LocalStorageUtil.lsSet('exercises', exercises);
            ExerciseStore.emitChange();
            break;
        default:
    }
});

module.exports = ExerciseStore;
