'use strict';

jest.dontMock('../../scripts/stores/TrainingStore.js');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');
jest.mock('../../scripts/utils/LocalStorageUtil.js');
jest.mock('../../scripts/stores/ExerciseStore.js');
let Immutable = require('immutable');

describe("TrainingStore", () => {
    let cb,
        LocalStorageUtil,
        AppDispatcher,
        ExerciseStore,
        TrainingStore,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        addTrainingAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_TRAINING,
                training: Immutable.fromJS({
                    id: 5,
                    sets: {
                        "1" : [
                            {reps: 5, weight: 5}
                        ],
                        "2" : [] 
                    },
                    workout: {
                        exercises: ["1", "2"],
                        label: "#1"
                    }
                })
            }
        },
        addSetTraining = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_TRAINING,
                training: Immutable.fromJS({
                    id: 5,
                    sets: {
                        '0': [
                            {reps: 5, weight: 5}
                        ],
                        '1': [
                            {reps: 5, weight: 5}
                        ]
                    },
                    workout: {
                        exercises: ["1", "2"],
                        label: "#1"
                    }
                })
            }
        },
        removeTrainingAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.REMOVE_TRAINING,
                index: 0
            }
        };

    beforeEach(() => {
        LocalStorageUtil = require('../../scripts/utils/LocalStorageUtil.js');
        ExerciseStore = require('../../scripts/stores/ExerciseStore');
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        TrainingStore = require('../../scripts/stores/TrainingStore.js');
        LocalStorageUtil.lsGet.mockImplementation(() => {
            return [];
        });
        ExerciseStore.getExercises.mockImplementation(() => {
            return Immutable.fromJS([
                {id: "0", label: "yar"},
                {id: "1", label: "hello"},
                {id: "2", label: "yay"}
            ]);
        });
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    afterEach(() => {
        LocalStorageUtil.lsGet.mockClear();
        LocalStorageUtil.lsSet.mockClear();
        ExerciseStore.getExercises.mockClear();
    });

    it("getTrainings", () => {
        var trainings = TrainingStore.getTrainings();
        expect(trainings.size).toEqual(0);
    });

    describe("getLastInputsForExercise", () => {
        it("returns empty rep and weight if nothing is found", () => {
            expect(TrainingStore.getLastInputsForExercise(0, 0).rep).toEqual('');
            expect(TrainingStore.getLastInputsForExercise(0, 0).weight).toEqual('');
        });

        it("returns empty rep and weight if there is no setnumber", () => {
            cb(addSetTraining);
            expect(TrainingStore.getLastInputsForExercise(0, null).rep).toEqual('');
            expect(TrainingStore.getLastInputsForExercise(0, null).weight).toEqual('');
        });

        it("returns empty rep and weight if no set was found", () => {
            cb(addSetTraining);
            expect(TrainingStore.getLastInputsForExercise('0', 1).rep).toEqual('');
            expect(TrainingStore.getLastInputsForExercise('0', 1).weight).toEqual('');
        });

        it("returns empty rep and weight if no exercise was found", () => {
            cb(addSetTraining);
            expect(TrainingStore.getLastInputsForExercise('1', 1).rep).toEqual('');
            expect(TrainingStore.getLastInputsForExercise('1', 1).weight).toEqual('');
        });

        it("returns empty rep and weight if there is a set", () => {
            cb(addSetTraining);
            expect(TrainingStore.getLastInputsForExercise('0', 0).rep).toEqual(5);
            expect(TrainingStore.getLastInputsForExercise('0', 0).weight).toEqual(5);
        });
    });

    it("getTrainings initializes the trainings, if they are uninitialized", () => {
        LocalStorageUtil.lsGet.mockImplementation(() => {
            return null;
        });
        expect(TrainingStore.getTrainings().size).toEqual(0);
    });

    it("doesn't throw on an unregistered action", () => {
        expect(cb.bind(null,{
            source: 'VIEW_ACTION',
            action: {
                type: 'NULL'
            }
        })).not.toThrow();
    });

    it("getTrainingForId returns undefined if there is no training found", () => {
        expect(TrainingStore.getTrainingForId(50)).toBe(undefined);
    });

    it("getTrainingForId returns the training for the specified id", () => {
        LocalStorageUtil.lsGet.mockImplementation(() => {
            return [
                {
                    id: 5
                }
            ];
        });
        expect(TrainingStore.getTrainingForId(5).get('id')).toBe(5);
    });

    it("addTraining", () => {
        cb(addTrainingAction);
        expect(TrainingStore.getTrainings().size).toBe(1);
        expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
        expect(LocalStorageUtil.lsSet.mock.calls[0][1].size).toBe(1);
    });

    it("removeTraining", () => {
        LocalStorageUtil.lsGet.mockImplementation(() => {
            return [
                {
                    id: 5
                }
            ];
        });
        cb(removeTrainingAction);
        expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
        expect(LocalStorageUtil.lsSet.mock.calls[0][1].size).toBe(0);
    });
});

