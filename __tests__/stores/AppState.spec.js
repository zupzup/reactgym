'use strict';

var _ = require('lodash');

jest.dontMock('../../scripts/stores/AppState.js');
jest.dontMock('object-assign');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');

describe("AppState", () => {
    let cb,
        AppState,
        AppDispatcher,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        setTransitionAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.SET_NEXT_TRANSITION,
                animation: 'hello'
            }
        },
        resetTransitionAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.RESET_TRANSITION
            }
        },
        startTimerAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.START_TIMER
            }
        },
        stopTimerAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.STOP_TIMER
            }
        },
        openModalAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.OPEN_MODAL,
                content: 'hello'
            }
        },
        closeModalAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.CLOSE_MODAL
            }
        },
        startTrainingAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.START_TRAINING,
                training: {
                    id: 5,
                    workout: {
                        label: 'test',
                        exercises: []
                    },
                    sets: {
                        '0': []
                    }
                }
            }
        },
        finishTrainingAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.FINISH_TRAINING
            }
        },
        addSetAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_SET,
                set: 'hello',
                exercise: '0'
            }
        },
        removeSetAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.REMOVE_SET,
                index: 0,
                exercise: '0'
            }
        },
        setCurrentExerciseAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.SET_CURRENT_EXERCISE,
                exercise: 0
            }
        },
        toggleMenuAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.TOGGLE_MENU
            }
        },
        closeMenuAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.CLOSE_MENU
            }
        };

    beforeEach(() => {
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        AppState = require('../../scripts/stores/AppState.js');
        AppState.DEFAULT_TIMER = 1;
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    it('tests the callback', () => {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('getAll', () => {
        expect(Object.keys(AppState.getAll()).length).toBe(3);
    });

    describe('transition', () => {
        it("getNextTransition", () => {
            expect(AppState.getNextTransition()).toEqual('slide');
        });

        it("setNextTransition", () => {
            cb(setTransitionAction);
            expect(AppState.getNextTransition()).toEqual('hello');
        });

        it("resetTransition", () => {
            cb(setTransitionAction);
            cb(resetTransitionAction);
            expect(AppState.getNextTransition()).toEqual('slide');
        });
    });

    describe('menu', () => {
        it("getMenuOpen", () => {
            expect(AppState.getMenuOpen()).toEqual(false);
        });

        it("toggleMenu", () => {
            cb(toggleMenuAction);
            var menuOpen = AppState.getMenuOpen();
            expect(menuOpen).toBe(true);

            cb(toggleMenuAction);
            menuOpen = AppState.getMenuOpen();
            expect(menuOpen).toBe(false);
        });

        it("closeMenu", () => {
            cb(toggleMenuAction);
            cb(closeMenuAction);
            var menuOpen = AppState.getMenuOpen();
            expect(menuOpen).toBe(false);
        });
    });

    describe('modal', () => {
        it("getModal", () => {
            expect(AppState.getModal()).toEqual(null);
        });

        it("openModal", () => {
            cb(openModalAction);
            expect(AppState.getModal()).toEqual('hello');
        });

        it("closeModal", () => {
            cb(openModalAction);
            cb(closeModalAction);
            expect(AppState.getModal()).toEqual(null);
        });
    });

    describe('modal', () => {
        var flag;
        it("getTimer", () => {
            expect(AppState.getTimer()).toEqual(null);
        });

        it("startTimer", () => {
            cb(startTimerAction);
            expect(AppState.getTimer()).toEqual(90);
        });

        it("stopTimer", () => {
            cb(startTimerAction);
            runs(() => {
                flag = false;
                setTimeout(() => {
                    flag = true;
                    cb(stopTimerAction);
                }, 1050);
                jest.runAllTimers();
            });

            waitsFor(() => {
                return flag; 
            }, 'timed out', 1200);

            runs(() => {
                expect(AppState.getTimer()).toEqual(null);
            });
        });
    });

    describe('activeTraining', () => {
        beforeEach(() => {
            cb(startTrainingAction);
        });

        it("startTraining", () => {
            expect(AppState.getActiveTraining().id).toEqual(5);
        });

        it("finishTraining", () => {
            cb(finishTrainingAction);
            expect(AppState.getActiveTraining()).toEqual(null);
        });

        it('add and removeSet', () => {
            cb(addSetAction);
            expect(AppState.getActiveTraining().sets[0].length).toBe(1);
            cb(removeSetAction);
            expect(AppState.getActiveTraining().sets[0].length).toBe(0);
        });

        it('setCurrentExercise', () => {
            cb(setCurrentExerciseAction);
            expect(AppState.getActiveTraining().currentExercise).toBe(0);
        });
    });
});

