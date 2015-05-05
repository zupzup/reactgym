'use strict';

jest.dontMock('../../scripts/stores/AppState.js');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');
jest.mock('../../scripts/utils/LocalStorageUtil.js');
let Immutable = require('immutable');

describe("AppState", () => {
    let cb,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher'),
        LocalStorageUtil = require('../../scripts/utils/LocalStorageUtil.js'),
        AppState = require('../../scripts/stores/AppState.js'),
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
                type: ActionTypes.START_TIMER,
                restTimer: 90
            }
        },
        startTimerActionShort = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.START_TIMER,
                restTimer: 0
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
                training: Immutable.fromJS({
                    id: 5,
                    workout: {
                        label: 'test',
                        exercises: []
                    },
                    sets: {
                        '0': ['hello']
                    }
                })
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
                set: 'ello',
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
        cb = AppDispatcher.register.mock.calls[0][0];
    });


    it('getAll', () => {
        expect(Object.keys(AppState.getAll()).length).toBe(3);
    });

    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null, {
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
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

    describe('timer', () => {
        var flag;
        it("getTimer", () => {
            expect(AppState.getTimer()).toEqual(null);
        });

        it("startTimer", () => {
            cb(startTimerAction);
            expect(AppState.getTimer()).toEqual(90);
        });

        it("stopTimer", () => {
            window.navigator = {
                notification: {
                    vibrate: jest.genMockFunction()
                }
            };
            cb(startTimerActionShort);
            runs(() => {
                flag = false;
                setTimeout(() => {
                    flag = true;
                }, 1050);
                jest.runAllTimers();
            });

            waitsFor(() => {
                return flag;
            }, 'timed out', 1200);

            runs(() => {
                expect(AppState.getTimer()).toEqual(null);
                expect(window.navigator.notification.vibrate.mock.calls.length).toBe(1);
            });
        });

        it("stopTimer by force", () => {
            window.navigator = {
                notification: {
                    vibrate: jest.genMockFunction()
                }
            };
            cb(startTimerAction);
            runs(() => {
                flag = false;
                setTimeout(() => {
                    flag = true;
                    cb(stopTimerAction);
                }, 600);
                jest.runOnlyPendingTimers();
            });

            waitsFor(() => {
                return flag;
            }, 'timed out', 2200);

            runs(() => {
                expect(AppState.getTimer()).toEqual(null);
            });
        });
    });

    describe('activeTraining', () => {
        beforeEach(() => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return [];
            });
        });

        afterEach(() => {
            LocalStorageUtil.lsGet.mockClear();
            LocalStorageUtil.lsSet.mockClear();
            LocalStorageUtil.lsRemove.mockClear();
        });

        it("getActiveTraining", () => {
            expect(AppState.getActiveTraining().size).toEqual(0);
        });

        it("startTraining", () => {
            cb(startTrainingAction);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1].get('id')).toBe(5);
        });


        it("finishTraining", () => {
            cb(finishTrainingAction);
            expect(LocalStorageUtil.lsRemove.mock.calls.length).toBe(1);
        });

        it('add and removeSet', () => {
            cb(startTrainingAction);
            cb(addSetAction);
            cb(removeSetAction);
            expect(AppState.getActiveTraining().get('sets').get('0').size).toBe(1);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(3);
        });

        it('setCurrentExercise', () => {
            cb(startTrainingAction);
            cb(setCurrentExerciseAction);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[1][1].get('currentExercise')).toBe(0);
        });
    });
});

