'use strict';

jest.dontMock('../../scripts/pages/TrainingDetail.js');
jest.mock('../../scripts/stores/TrainingStore.js');
jest.mock('../../scripts/stores/ExerciseStore.js');
jest.mock('react-router');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    HeaderStateActionCreators = require('../../scripts/actions/HeaderStateActionCreators.js'),
    Immutable = require('immutable'),
    AppState = require('../../scripts/stores/AppState.js'),
    TrainingDetail = require('../../scripts/pages/TrainingDetail.js');

describe("TrainingDetail", () => {
    var detail;
    beforeEach(() => {
        TrainingStore.getTrainingForId.mockImplementation(() => {
            return Immutable.fromJS(
                {
                    id: 0,
                    date: '01.02.2015',
                    workout: {
                        label: 'some training'
                    },
                    sets: {
                        '1': [
                            {reps: 15, weight: 10}
                        ],
                        '2': [
                            {reps: 1, weight: 1}
                        ]
                    }
                } 
            );
        });
        ExerciseStore.getExercises.mockImplementation(() => {
            return Immutable.fromJS([
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
                ]);
        });
        Router.State.getQuery.mockImplementation(() => {
            return {
                training: 0
            }; 
        });
        detail = TestUtils.renderIntoDocument(<TrainingDetail />);
    });

    afterEach(() => {
        TrainingStore.getTrainingForId.mockClear();
        Router.State.getQuery.mockClear();
        ExerciseStore.getExercises.mockClear();
    });

    it("renders a TrainingDetail Page", () => {
        expect(TestUtils.isCompositeComponent(detail)).toEqual(true);
        expect(detail.getDOMNode().className).toEqual('page trainingdetail');
    });

    it("renders invalid id, if there is no training for the given id", () => {
        TrainingStore.getTrainingForId.mockImplementation(() => {
            return undefined;
        });
        detail = TestUtils.renderIntoDocument(<TrainingDetail />);
        expect(detail.getDOMNode().textContent).toEqual('invalid Id');
    });
});

