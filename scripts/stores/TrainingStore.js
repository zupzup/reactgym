'use strict';

var react = require('react'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants/ActionTypes'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _trainings = [];

var TrainingStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getTrainings: function() {
        return _trainings;
    },

    getTrainingForId: function(id) {
        var results = _trainings.filter(function(item) {
            return item.id === id;
        });
        if(results.length > 0) {
            return results[0];
        }
    }
});

TrainingStore.dispatchToken = AppDispatcher.register(function(payload) {
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

