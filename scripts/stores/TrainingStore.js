'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    Immutable = require('immutable'),
    assign = require('object-assign'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    _trainings = Immutable.List();

var TrainingStore = assign({}, StoreListenerMixin, {
    getTrainings() {
        if(_trainings.size === 0) {
            _trainings = Immutable.fromJS(LocalStorageUtil.lsGet('trainings')) || Immutable.List();
        }
        return _trainings;
    },

    getTrainingForId(id) {
        return this.getTrainings().filter((item) => {
            return item.get('id') == id;
        }).first();
    },

    getLastInputsForExercise(exercise, setNumber) {
        if(!_trainings || _trainings.size === 0 || setNumber == null) {
            return {rep: '', weight: ''};
        }
        console.log(_trainings.last().get('sets').get(exercise));
        var set = _trainings.last().get('sets').get(exercise).get(setNumber);
        if(!set) {
            return {rep: '', weight: ''};
        }
        return {
            rep: set.get('reps'),
            weight: set.get('weight')
        };
    }
});

TrainingStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.ADD_TRAINING:
            var trainingToAdd = action.training;
            trainingToAdd = trainingToAdd.set('date', new Date());
            _trainings = _trainings.push(trainingToAdd);
            LocalStorageUtil.lsSet('trainings', _trainings);
            TrainingStore.emitChange();
            break;
        case ActionTypes.REMOVE_TRAINING:
            _trainings = _trainings.splice(action.index, 1);
            LocalStorageUtil.lsSet('trainings', _trainings);
            TrainingStore.emitChange();
            break;
        default:
    }
});

module.exports = TrainingStore;

