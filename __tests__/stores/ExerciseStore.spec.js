'use strict';

jest.dontMock('../../scripts/stores/ExerciseStore.js');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');
jest.mock('../../scripts/utils/LocalStorageUtil.js');

describe("ExerciseStore", () => {
    let cb,
        LocalStorageUtil,
        AppDispatcher,
        ExerciseStore,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        actionAddExercises = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_EXERCISE,
                exercise: 'Hyperextensions'
            }
        },
        actionUpdateExercise = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.UPDATE_EXERCISE,
                exercise: {
                    id: 1,
                    label: 'newLabel'
                }
            }
        },
        actionRemoveExercise = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.REMOVE_EXERCISE,
                index: 0
            }
        },
        actionRequestExercises = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.GET_EXERCISES
            }
        };

    beforeEach(() => {
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        ExerciseStore = require('../../scripts/stores/ExerciseStore.js');
        LocalStorageUtil.lsGet.mockImplementation(() => {
            return [];
        });
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    afterEach(() => {
        LocalStorageUtil.lsGet.mockClear();
        LocalStorageUtil.lsSet.mockClear();
    });

    it("getExercises", () => {
        var exercises = ExerciseStore.getExercises();
        expect(exercises.size).toEqual(0);
    });

    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null, {
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
    });

    describe('has exercises', () => {
        it("getExerciseForId", () => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return [
                    {
                        id: '1',
                        label: 'T-Bar-Rows'
                    }
                ];
            });
            var exercise = ExerciseStore.getExerciseForId('1');
            expect(exercise.get('label')).toEqual('T-Bar-Rows');
        });

        it("requests exercises if they are initialized", () => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return [];
            });
            cb(actionRequestExercises);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(0);
        });

        it("creates initial exercises, if they are uninitialized", () => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return null;
            });
            cb(actionRequestExercises);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1].get(0).get('id')).toBe('1');
            expect(LocalStorageUtil.lsSet.mock.calls[0][1].get(0).get('label')).toBe('T-Bar-Rows');
        });

        it("adds exercises", () => {
            cb(actionAddExercises);
            cb(actionAddExercises);
            expect(ExerciseStore.getExercises().size).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(2);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1].get(0).get('label')).toBe('Hyperextensions');
        });

        it("updates exercises", () => {
            cb(actionAddExercises);
            cb(actionAddExercises);
            cb(actionUpdateExercise);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(3);
            expect(LocalStorageUtil.lsSet.mock.calls[2][1].get(0).get('label')).toBe('newLabel');
        });

        it("removes exercises", () => {
            cb(actionRemoveExercise);
            expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
            expect(LocalStorageUtil.lsSet.mock.calls[0][1].size).toBe(0);
        });
    });
});

