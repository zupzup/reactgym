'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    setNextTransition: function(animation) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SET_NEXT_TRANSITION,
            animation: animation
        });
    },

    resetTransitions: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.RESET_TRANSITION,
            animation: 'slide'
        });
    },

    toggleMenu: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.TOGGLE_MENU
        });
    },

    closeMenu: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CLOSE_MENU
        });
    },

    openModal: function(content) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.OPEN_MODAL,
            content: content
        });
    },

    closeModal: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CLOSE_MODAL
        });
    },

    startTraining: function(id) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.START_TRAINING,
            id: id
        });
    },

    finishTraining: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.FINISH_TRAINING
        });
    },

    startTimer: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.START_TIMER
        });
    },

    stopTimer: function() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.STOP_TIMER
        });
    },

    addSet: function(id, reps, weight) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_SET,
            exercise: id,
            set: {reps: reps, weight: weight}
        });
    },

    removeSet: function(id, index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_SET,
            exercise: id,
            index: index
        });
    },

    setCurrentExercise: function(id) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SET_CURRENT_EXERCISE,
            exercise: id,
        });
    }
};
