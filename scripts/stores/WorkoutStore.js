'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _workouts = [];

var WorkoutStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getWorkouts: function() {
        return _workouts;
    }

});

WorkoutStore.dispatchToken = AppDispatcher.register(function(payload) {
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
                    id: _workouts.map(function(item) {
                        return item.id + 1;
                    }).reduce(function(acc, item) {
                        return item;
                    }, 0),
                    label: payload.action.workout
                });
            WorkoutStore.emitChange();
            break;
        case ActionTypes.REMOVE_WORKOUT:
            _workouts.splice(payload.action.index, 1);
            WorkoutStore.emitChange();
            break;
        case ActionTypes.UPDATE_WORKOUT:
            _workouts.map(function(item) {
                if(payload.action.workout.index === item.id) {
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
