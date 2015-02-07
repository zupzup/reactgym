'use strict';

jest.dontMock('../../scripts/stores/WorkoutStore.js');
jest.dontMock('object-assign');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');
jest.mock('../../scripts/utils/LocalStorageUtil.js');

describe("WorkoutStore", () => {
    let cb,
        LocalStorageUtil = require('../../scripts/utils/LocalStorageUtil.js'),
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        WorkoutStore = require('../../scripts/stores/WorkoutStore.js');
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        actionAddWorkout = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_WORKOUT,
                workout: {
                    label: '#3',
                    exercises: [0, 1]
                } 
            }
        },
        actionRemoveWorkout = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.REMOVE_WORKOUT,
                index: 0
            }
        },
        actionRemoveExercise = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.REMOVE_EXERCISE_FROM_WORKOUTS,
                id: 2
            }
        },
        actionUpdateWorkout = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.UPDATE_WORKOUT,
                workout: {
                    id: 1,
                    label: '#4',
                    exercises: [1]
                } 
            }
        },
        actionUpdateWorkoutFalse = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.UPDATE_WORKOUT,
                workout: {
                    id: 0,
                    label: '#4',
                    exercises: [1]
                } 
            }
        },
        actionRequestWorkouts = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.GET_WORKOUTS
            }
        };

    beforeEach(() => {
        LocalStorageUtil.lsGet.mockImplementation(() => {
            return [];
        });
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    afterEach(() => {
        LocalStorageUtil.lsGet.mockClear();
        LocalStorageUtil.lsSet.mockClear();
    });

    it("gets workouts", () => {
        var workouts = WorkoutStore.getWorkouts();
        expect(workouts).toEqual([]);
    });

    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null,{
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
    });

    describe("has workouts", () => {
        beforeEach(() => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return [
                    {
                        id: 1,
                        label: 'Chest Triceps Shoulders Abs',
                        exercises: [1, 2]
                    },
                    {
                        id: 2,
                        label: 'Back Biceps Legs',
                        exercises: [2, 3]
                    }
                ];
            });
        });

        it("requests workouts", () => {
            cb(actionRequestWorkouts);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(0);
        });

        it("creates workouts if they are uninitialized", () => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return null;
            });
            cb(actionRequestWorkouts);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
        });

        it("adds workouts", () => {
            cb(actionAddWorkout);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1][2].label).toBe('#3');
        });

        it("removes workouts", () => {
            cb(actionRemoveWorkout);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1].length).toBe(1);
        });

        it("updates workouts", () => {
            cb(actionUpdateWorkout);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1].length).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1][0].label).toBe('#4');
        });

        it("doesn't change anything, if the id wasn't found", () => {
            cb(actionUpdateWorkoutFalse);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1].length).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1][0].label).toBe('Chest Triceps Shoulders Abs');
        });

        it("removes the exercise from all workouts", () => {
            cb(actionRemoveExercise);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1].length).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1][0].exercises).not.toContain(2);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1][1].exercises).not.toContain(2);
        });
    });
});

