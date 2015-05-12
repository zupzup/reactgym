'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';
import assign from 'object-assign';
import ExerciseStore from '../stores/ExerciseStore';
import LocalStorageUtil from '../utils/LocalStorageUtil.js';
import StoreListenerMixin from '../mixins/StoreListenerMixin.js';

let _trainings = Immutable.List();

let TrainingStore = assign({}, StoreListenerMixin, {
    getTrainings() {
        if (_trainings.size === 0) {
            _trainings = Immutable.fromJS(LocalStorageUtil.lsGet('trainings')) || Immutable.List();
        }
        return _trainings;
    },

    getTrainingForId(id) {
        return this.getTrainings().filter((item) => {
            return item.get('id') == id;
        }).first();
    },

    getLastInputsForExercise(exercise, setNumber, workout) {
        let emptyRep = {rep: '', weight: ''},
            trainings = this.getTrainings();
        let filtered = (!trainings || trainings.size === 0) ? trainings : trainings.filter((item) => {
            return item.get('workout').get('id') === workout.get('id');
        });
        if (!filtered || filtered.size === 0 || setNumber == null
                || !filtered.last().get('sets') ||
                !filtered.last().get('sets').get(exercise)) {
            return emptyRep;
        }
        let set = filtered.last().get('sets').get(exercise).get(setNumber);
        if (!set) {
            return emptyRep;
        }
        return {
            rep: set.get('reps'),
            weight: set.get('weight')
        };
    }
});

TrainingStore.dispatchToken = AppDispatcher.register((payload) => {
    let action = payload.action;

    switch (action.type) {
        case ActionTypes.RESTORE_TRAININGS:
            _trainings = Immutable.fromJS(action.data);
            LocalStorageUtil.lsSet('trainings', _trainings);
            TrainingStore.emitChange();
            break;
        case ActionTypes.ADD_TRAINING:
            var storedExercises = ExerciseStore.getExercises(),
                trainingToAdd = action.training;
            trainingToAdd = trainingToAdd.updateIn(['workout', 'exercises'],
                exercises => exercises.map(e => {
                    return storedExercises.find(i => i.get('id') == e);
                }));
            trainingToAdd = trainingToAdd.set('dateEnd', new Date());
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
