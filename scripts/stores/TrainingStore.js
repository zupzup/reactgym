'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    LocalStorageUtil = require('../utils/LocalStorageUtil.js'),
    StoreListenerMixin = require('../mixins/StoreListenerMixin.js');

var TrainingStore = assign({}, StoreListenerMixin, {
    getTrainings() {
        var trainings = LocalStorageUtil.lsGet('trainings');
        if(trainings == null) {
            trainings = [];
            LocalStorageUtil.lsSet('trainings', trainings);
        }
        return trainings;
    },

    getTrainingForId(id) {
        var trainings = LocalStorageUtil.lsGet('trainings');
        var results = trainings.filter((item) => {
            return item.id === id;
        });
        if(results.length > 0) {
            return results[0];
        }
    }
});

TrainingStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.ADD_TRAINING:
            var trainings = LocalStorageUtil.lsGet('trainings');
            action.training.date = new Date();
            trainings.push(action.training);
            LocalStorageUtil.lsSet('trainings', trainings);
            TrainingStore.emitChange();
            break;
        case ActionTypes.REMOVE_TRAINING:
            var trainings = LocalStorageUtil.lsGet('trainings');
            trainings.splice(action.index, 1);
            LocalStorageUtil.lsSet('trainings', trainings);
            TrainingStore.emitChange();
            break;
        default:
    }
});

module.exports = TrainingStore;

