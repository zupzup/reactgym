'use strict';

jest.dontMock('../../scripts/stores/ExerciseStore.js');
jest.dontMock('object-assign');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');
jest.mock('../../scripts/utils/LocalStorageUtil.js');

describe("ExerciseStore", () => {
    let cb,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        LocalStorageUtil = require('../../scripts/utils/LocalStorageUtil.js'),
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher'),
        ExerciseStore = require('../../scripts/stores/ExerciseStore.js'),
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
                    id: 3,
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
        expect(exercises).toEqual([]);
    });

    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null,{
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
    });

    describe('has exercises', () => {
        beforeEach(() => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return [
                    {
                        id: 1,
                        label: 'T-Bar-Rows'
                    },
                    {
                        id: 2,
                        label: 'Hammercurls'
                    },
                    {
                        id: 3,
                        label: 'Butterfly'
                    }
                ];
            });
        });

        it("getExerciseForId", () => {
            var exercise = ExerciseStore.getExerciseForId(1);
            expect(exercise.label).toEqual('T-Bar-Rows');
        });
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
        expect(LocalStorageUtil.lsSet.mock.calls[0][1][0].id).toBe(1);
        expect(LocalStorageUtil.lsSet.mock.calls[0][1][0].label).toBe('T-Bar-Rows');
    });

    it("adds exercises", () => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return [
                    {
                        id: 3,
                        label: 'Butterfly'
                    }
                ];
            });
        cb(actionAddExercises);
        expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
        expect(LocalStorageUtil.lsSet.mock.calls[0][1][1].label).toBe('Hyperextensions');
    });
    
    it("updates exercises", () => {
            LocalStorageUtil.lsGet.mockImplementation(() => {
                return [
                    {
                        id: 3,
                        label: 'Butterfly'
                    },
                    {
                        id: 4,
                        label: 'Hyperextensions'
                    }
                ];
            });
        cb(actionUpdateExercise);
        expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
        expect(LocalStorageUtil.lsSet.mock.calls[0][1][0].label).toBe('newLabel');
    });

    it("removes exercises", () => {
        cb(actionAddExercises);
        cb(actionRemoveExercise);
        expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(2);
        expect(LocalStorageUtil.lsSet.mock.calls[1][1].length).toBe(0);
    });
});

