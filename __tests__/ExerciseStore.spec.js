'use strict';

var _ = require('lodash');

jest.dontMock('../scripts/stores/ExerciseStore.js');
jest.dontMock('object-assign');
jest.mock('../scripts/dispatcher/AppDispatcher.js');

describe("ExerciseStore", () => {
    let cb,
        ExerciseStore,
        AppDispatcher,
        ActionTypes = require('../scripts/constants/ActionTypes.js'),
        actionAddExercises = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_EXERCISE,
                exercise: 'Hyperextensions'
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
        jest.autoMockOn();
        AppDispatcher = require('../scripts/dispatcher/AppDispatcher');
        ExerciseStore = require('../scripts/stores/ExerciseStore.js');
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    it("tests the callback", () => {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it("getExercises", () => {
        var exercises = ExerciseStore.getExercises();
        expect(exercises).toEqual([]);
    });

    it("requests exercises", () => {
        cb(actionRequestExercises);
        var exercises = ExerciseStore.getExercises();
        expect(exercises.length).toEqual(3);
        expect(_.first(exercises).label).toEqual('T-Bar-Rows');
    });

    it("adds exercises", () => {
        cb(actionAddExercises);
        cb(actionAddExercises);
        var exercises = ExerciseStore.getExercises();
        expect(exercises.length).toEqual(2);
        expect(_.first(exercises).label).toEqual('Hyperextensions');
    });

    it("removes exercises", () => {
        cb(actionAddExercises);
        cb(actionRemoveExercise);
        var exercises = ExerciseStore.getExercises();
        expect(exercises.length).toEqual(0);
    });
});

