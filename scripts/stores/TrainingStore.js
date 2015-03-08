'use strict';

let react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    Immutable = require('immutable'),
    assign = require('object-assign'),
    ExerciseStore = require('../stores/ExerciseStore'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js'),
    _trainings = Immutable.List();

let TrainingStore = assign({}, StoreListenerMixin, {
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
        let emptyRep = {rep: '', weight: ''},
            trainings = this.getTrainings();
        if(!trainings || trainings.size === 0 || 
            setNumber == null || !trainings.last().get('sets') || 
            !trainings.last().get('sets').get(exercise)) {
            return emptyRep; 
        }
        let set = trainings.last().get('sets').get(exercise).get(setNumber);
        if(!set) {
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

    switch(action.type) {
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

