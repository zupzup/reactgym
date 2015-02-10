'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    Immutable = require('immutable'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    _workouts = Immutable.List();

var WorkoutStore = assign({}, StoreListenerMixin, {
    getWorkouts() {
        if(_workouts.size === 0) {
            _workouts = Immutable.fromJS(LocalStorageUtil.lsGet('workouts'));
        }
        return _workouts;
    }
});

WorkoutStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.GET_WORKOUTS:
            var workouts = LocalStorageUtil.lsGet('workouts');
            if(workouts == null) {
                _workouts = Immutable.fromJS([
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
                LocalStorageUtil.lsSet('workouts', _workouts); 
                WorkoutStore.emitChange();
            }
            break;
        case ActionTypes.ADD_WORKOUT:
            _workouts = _workouts.push(Immutable.Map({
                id: _workouts.reduce((a, i) => i.get('id'), 0) + 1,
                label: action.workout.label,
                exercises: action.workout.exercises
            }));
            LocalStorageUtil.lsSet('workouts', _workouts);
            WorkoutStore.emitChange();
            break;
        case ActionTypes.REMOVE_WORKOUT:
            _workouts = _workouts.splice(action.index, 1);
            LocalStorageUtil.lsSet('workouts', _workouts);
            WorkoutStore.emitChange();
            break;
        case ActionTypes.UPDATE_WORKOUT:
            var workout = Immutable.Map(action.workout);
            _workouts = _workouts.map((item) => {
                if(workout.get('id') === item.get('id')) {
                    return workout;
                }
                return item;
            });
            LocalStorageUtil.lsSet('workouts', _workouts);
            WorkoutStore.emitChange();
            break;
        case ActionTypes.REMOVE_EXERCISE_FROM_WORKOUTS:
            _workouts = _workouts.map((item) => {
                return item.setIn('exercises', item.get('exercises').filter(ex => ex !== action.id));
            });
            LocalStorageUtil.lsSet('workouts', _workouts);
            WorkoutStore.emitChange();
            break;
        default:
    }
});

module.exports = WorkoutStore;
