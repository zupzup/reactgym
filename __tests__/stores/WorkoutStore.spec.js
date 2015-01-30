'use strict';

jest.dontMock('../../scripts/stores/WorkoutStore.js');
jest.dontMock('object-assign');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');

describe("WorkoutStore", () => {
    let cb,
        WorkoutStore,
        AppDispatcher,
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
        actionUpdateWorkout = {
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
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        WorkoutStore = require('../../scripts/stores/WorkoutStore.js');
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    it("gets workouts", () => {
        var workouts = WorkoutStore.getWorkouts();
        expect(workouts).toEqual([]);
    });

    it("requests workouts", () => {
        cb(actionRequestWorkouts);
        var workouts = WorkoutStore.getWorkouts();
        expect(workouts.length).toEqual(2);
        expect(workouts[0].label).toEqual('Chest Triceps Shoulders Abs');
        expect(workouts[0].exercises.length).toEqual(2);
    });

    it("adds workouts", () => {
        cb(actionAddWorkout);
        var workouts = WorkoutStore.getWorkouts();
        expect(workouts.length).toEqual(1);
        expect(workouts[0].label).toEqual('#3');
    });

    it("removes workouts", () => {
        cb(actionAddWorkout);
        cb(actionAddWorkout);
        cb(actionRemoveWorkout);
        var workouts = WorkoutStore.getWorkouts();
        expect(workouts.length).toEqual(1);
    });

    it("updates workouts", () => {
        cb(actionAddWorkout);

        cb(actionUpdateWorkout);
        var workouts = WorkoutStore.getWorkouts();
        expect(workouts.length).toEqual(1);
        expect(workouts[0].label).toEqual('#4');
        expect(workouts[0].exercises.length).toEqual(1);
    });
});

