'use strict';

jest.dontMock('../../scripts/stores/WorkoutStore.js');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');
jest.mock('../../scripts/utils/LocalStorageUtil.js');
var Immutable = require('immutable');

describe("WorkoutStore", () => {
    let cb,
        AppDispatcher,
        WorkoutStore,
        LocalStorageUtil,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        restoreAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.RESTORE_WORKOUTS,
                data: [
                {
                    id: 1,
                    label: 'newLabel'
                },
                {
                    id: 2,
                    label: 'newLabel'
                }
                ]
            }
        },
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
        LocalStorageUtil = require('../../scripts/utils/LocalStorageUtil.js');
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        WorkoutStore = require('../../scripts/stores/WorkoutStore.js');
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
        expect(workouts.size).toEqual(0);
    });

    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null, {
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
    });

    describe("has workouts", () => {
        beforeEach(() => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return Immutable.fromJS([
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
                ]);
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
            cb(actionAddWorkout);
            expect(WorkoutStore.getWorkouts().size).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[1][1].get(1).get('label')).toBe('#3');
        });

        it("removes workouts", () => {
            cb(actionAddWorkout);
            cb(actionRemoveWorkout);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[1][1].size).toBe(0);
        });

        it("updates workouts", () => {
            cb(actionAddWorkout);
            cb(actionAddWorkout);
            cb(actionUpdateWorkout);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(3);
            expect(LocalStorageUtil.lsSet.mock.calls[2][1].size).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[2][1].get(0).get('label')).toBe('#4');
        });

        it("doesn't change anything, if the id wasn't found", () => {
            cb(actionAddWorkout);
            cb(actionAddWorkout);
            cb(actionUpdateWorkoutFalse);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(3);
            expect(LocalStorageUtil.lsSet.mock.calls[2][1].size).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[2][1].get(0).get('label')).toBe('#3');
        });

        it("removes the exercise from all workouts", () => {
            cb(actionAddWorkout);
            cb(actionAddWorkout);
            cb(actionRemoveExercise);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(3);
            expect(LocalStorageUtil.lsSet.mock.calls[2][1].size).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[2][1].get(0).get('exercises')).not.toContain(2);
            expect(LocalStorageUtil.lsSet.mock.calls[2][1].get(1).get('exercises')).not.toContain(2);
        });

        it("restores workouts", () => {
            cb(restoreAction);
            expect(WorkoutStore.getWorkouts().size).toBe(2);
        });
    });
});

