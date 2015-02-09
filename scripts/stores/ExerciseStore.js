'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    _ = require('lodash'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    Immutable = require('immutable'),
    assign = require('object-assign'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    _exercises = Immutable.List();

var ExerciseStore = assign({}, StoreListenerMixin, {
    getExerciseForId(id) {
        return this.getExercises().filter((exercise) => {
            return exercise.get('id') == id;
        }).first();
    },

    getExercises() {
        if(_exercises.size === 0) {
            _exercises = Immutable.fromJS(LocalStorageUtil.lsGet('exercises'));
        }
        return _exercises;
    }
});

ExerciseStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.GET_EXERCISES:
            var exercises = LocalStorageUtil.lsGet('exercises');
            if(exercises == null) {
                _exercises = Immutable.fromJS([
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
                LocalStorageUtil.lsSet('exercises', _exercises);
                ExerciseStore.emitChange();
            }
            break;
        case ActionTypes.ADD_EXERCISE:
            _exercises = _exercises.push(Immutable.Map({
                    id: _exercises.reduce((a, i) => i.get('id'), 0) + 1,
                    label: action.exercise
                }));
            LocalStorageUtil.lsSet('exercises', _exercises);
            ExerciseStore.emitChange();
            break;
        case ActionTypes.UPDATE_EXERCISE:
            var exercise = Immutable.Map(action.exercise);
            _exercises = _exercises.map((item) => {
                if(exercise.get('id') === item.get('id')) {
                    return exercise;
                }
                return item;
            });
            LocalStorageUtil.lsSet('exercises', _exercises);
            ExerciseStore.emitChange();
            break;
        case ActionTypes.REMOVE_EXERCISE:
            _exercises = _exercises.splice(action.index, 1);
            LocalStorageUtil.lsSet('exercises', _exercises);
            ExerciseStore.emitChange();
            break;
        default:
    }
});

module.exports = ExerciseStore;
