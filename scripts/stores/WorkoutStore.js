'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js');

var WorkoutStore = assign({}, StoreListenerMixin, {
    getWorkouts() {
        return LocalStorageUtil.lsGet('workouts');
    }
});

WorkoutStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.GET_WORKOUTS:
            var workouts = LocalStorageUtil.lsGet('workouts');
            if(workouts == null) {
                LocalStorageUtil.lsSet('workouts', 
                [
                    {
                        id: 1,
                        label: 'Chest Triceps Shoulders Abs',
                        exercises: [1, 2]
                    },
                    {
                        id: 2,
                        label: 'Back Biceps Legs',
                        exercises: [2, 3]
                    }
                ]);
                WorkoutStore.emitChange();
            }
            break;
        case ActionTypes.ADD_WORKOUT:
            var workouts = LocalStorageUtil.lsGet('workouts');
            workouts.push({
                id: workouts.map((item) => {
                    return item.id + 1;
                }).reduce((acc, item) => {
                    return item;
                }, 0),
                label: payload.action.workout.label,
                exercises: payload.action.workout.exercises
            });
            LocalStorageUtil.lsSet('workouts', workouts);
            WorkoutStore.emitChange();
            break;
        case ActionTypes.REMOVE_WORKOUT:
            var workouts = LocalStorageUtil.lsGet('workouts');
            workouts.splice(payload.action.index, 1);
            LocalStorageUtil.lsSet('workouts', workouts);
            WorkoutStore.emitChange();
            break;
        case ActionTypes.UPDATE_WORKOUT:
            var workouts = LocalStorageUtil.lsGet('workouts');
            workouts = workouts.map((item) => {
                if(payload.action.workout.id === item.id) {
                    item = payload.action.workout; 
                }
                return item;
            });
            LocalStorageUtil.lsSet('workouts', workouts);
            WorkoutStore.emitChange();
            break;
        case ActionTypes.REMOVE_EXERCISE_FROM_WORKOUTS:
            var workouts = LocalStorageUtil.lsGet('workouts');
            workouts = workouts.map((item) => {
                item.exercises = item.exercises.filter(ex => ex !== payload.action.id);
                return item;
            });
            LocalStorageUtil.lsSet('workouts', workouts);
            WorkoutStore.emitChange();
            break;
        default:
    }
});

module.exports = WorkoutStore;
