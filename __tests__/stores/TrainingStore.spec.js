'use strict';

jest.dontMock('../../scripts/stores/TrainingStore.js');
jest.dontMock('object-assign');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');

describe("TrainingStore", () => {
    let cb,
        TrainingStore,
        AppDispatcher,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        addTrainingAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_TRAINING,
                training: {
                    id: 5
                }
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
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        TrainingStore = require('../../scripts/stores/TrainingStore.js');
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    it("getTrainings", () => {
        var trainings = TrainingStore.getTrainings();
        expect(trainings).toEqual([]);
    });

    it("addTraining", () => {
        cb(addTrainingAction);
        var training = TrainingStore.getTrainingForId(5);
        expect(training.id).toEqual(5);
    });

    it("removeTraining", () => {
        cb(addTrainingAction);
        cb(removeTrainingAction);
        var trainings = TrainingStore.getTrainings();
        expect(trainings).toEqual([]);
    });
});

