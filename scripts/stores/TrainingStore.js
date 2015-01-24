'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _trainings = [];

var TrainingStore = assign({}, EventEmitter.prototype, {

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getTrainings() {
        return _trainings;
    },

    getTrainingForId(id) {
        var results = _trainings.filter((item) => {
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
            _trainings.push(payload.action.training);
            TrainingStore.emitChange();
            break;
        case ActionTypes.REMOVE_TRAINING:
            _trainings.splice(payload.action.index, 1);
            TrainingStore.emitChange();
            break;
        default:
    }
});

module.exports = TrainingStore;

