'use strict';

jest.dontMock('../../scripts/pages/Training.js');
jest.mock('../../scripts/actions/WorkoutStoreActionCreators.js');
jest.mock('../../scripts/actions/AppStateActionCreators.js');
jest.mock('react-router');
jest.mock('../../scripts/stores/WorkoutStore.js');
jest.mock('../../scripts/stores/AppState.js');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    WorkoutStoreActionCreators = require('../../scripts/actions/WorkoutStoreActionCreators.js'),
    AppStateActionCreators = require('../../scripts/actions/AppStateActionCreators.js'),
    WorkoutStore = require('../../scripts/stores/WorkoutStore.js'),
    Router = require('react-router'),
    AppState = require('../../scripts/stores/AppState.js'),
    Training = require('../../scripts/pages/Training.js');

describe("Training", () => {
    var training;
    beforeEach(() => {
        AppState.getActiveTraining.mockImplementation(() => {
            return null;
        });
        WorkoutStore.getWorkouts.mockImplementation(() => {
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
        training = TestUtils.renderIntoDocument(<Training />);
    });

    afterEach(() => {
        WorkoutStore.getWorkouts.mockClear();
        AppState.getActiveTraining.mockClear();
        training.componentWillUnmount();
    });

    it("renders a Training Page", () => {
        expect(TestUtils.isCompositeComponent(training)).toEqual(true);
        expect(training.getDOMNode().className).toEqual('page training');
    });

});

