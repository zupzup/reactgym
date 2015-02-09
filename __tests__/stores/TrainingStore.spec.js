'use strict';

jest.dontMock('../../scripts/stores/TrainingStore.js');
jest.dontMock('object-assign');
jest.mock('../../scripts/dispatcher/AppDispatcher.js');
jest.mock('../../scripts/utils/LocalStorageUtil.js');
let Immutable = require('immutable');

describe("TrainingStore", () => {
    let cb,
        ActionTypes = require('../../scripts/constants/ActionTypes.js'),
        LocalStorageUtil = require('../../scripts/utils/LocalStorageUtil.js'),
        AppDispatcher = require('../../scripts/dispatcher/AppDispatcher');
        TrainingStore = require('../../scripts/stores/TrainingStore.js');
        addTrainingAction = {
            source: 'VIEW_ACTION',
            action: {
                type: ActionTypes.ADD_TRAINING,
                training: Immutable.fromJS({
                    id: 5
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
        LocalStorageUtil.lsGet.mockImplementation(() => {
            return [];
        });
        cb = AppDispatcher.register.mock.calls[0][0];
    });

    afterEach(() => {
        LocalStorageUtil.lsGet.mockClear();
        LocalStorageUtil.lsSet.mockClear();
    });

    it("getTrainings", () => {
        var trainings = TrainingStore.getTrainings();
        expect(trainings).toEqual([]);
    });

    it("getTrainings initializes the trainings, if they are uninitialized", () => {
        LocalStorageUtil.lsGet.mockImplementation(() => {
            return null;
        });
        expect(TrainingStore.getTrainings()).toEqual([]);
        expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
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
        expect(TrainingStore.getTrainingForId(5).id).toBe(5);
    });

    it("addTraining", () => {
        cb(addTrainingAction);
        expect(LocalStorageUtil.lsSet.mock.calls.length).toBe(1);
        expect(LocalStorageUtil.lsSet.mock.calls[0][1].length).toBe(1);
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
        expect(LocalStorageUtil.lsSet.mock.calls[0][1].length).toBe(0);
    });
});

