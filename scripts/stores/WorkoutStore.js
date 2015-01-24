'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _workouts = [];

var WorkoutStore = assign({}, EventEmitter.prototype, {

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getWorkouts() {
        return _workouts;
    }

});

WorkoutStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.GET_WORKOUTS:
            _workouts = [
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
            ];
            WorkoutStore.emitChange();
            break;
        case ActionTypes.ADD_WORKOUT:
            _workouts.push({
                    id: _workouts.map((item) => {
                        return item.id + 1;
                    }).reduce((acc, item) => {
                        return item;
                    }, 0),
                    label: payload.action.workout.label,
                    exercises: payload.action.workout.exercises
                });
            WorkoutStore.emitChange();
            break;
        case ActionTypes.REMOVE_WORKOUT:
            _workouts.splice(payload.action.index, 1);
            WorkoutStore.emitChange();
            break;
        case ActionTypes.UPDATE_WORKOUT:
            _workouts = _workouts.map((item) => {
                if(payload.action.workout.id === item.id) {
                    item = payload.action.workout; 
                }
                return item;
            });
            WorkoutStore.emitChange();
            break;
        default:
    }
});

module.exports = WorkoutStore;
