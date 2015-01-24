'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

module.exports = {
    setNextTransition(animation) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SET_NEXT_TRANSITION,
            animation: animation
        });
    },

    resetTransitions() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.RESET_TRANSITION,
            animation: 'slide'
        });
    },

    toggleMenu() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.TOGGLE_MENU
        });
    },

    closeMenu() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CLOSE_MENU
        });
    },

    openModal(content) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.OPEN_MODAL,
            content: content
        });
    },

    closeModal() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CLOSE_MODAL
        });
    },

    startTraining(id) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.START_TRAINING,
            id: id
        });
    },

    finishTraining() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.FINISH_TRAINING
        });
    },

    startTimer() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.START_TIMER
        });
    },

    stopTimer() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.STOP_TIMER
        });
    },

    addSet(id, reps, weight) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_SET,
            exercise: id,
            set: {reps: reps, weight: weight}
        });
    },

    removeSet(id, index) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_SET,
            exercise: id,
            index: index
        });
    },

    setCurrentExercise(id) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SET_CURRENT_EXERCISE,
            exercise: id,
        });
    }
};
