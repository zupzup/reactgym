'use strict';

jest.dontMock('../../scripts/pages/Training.js');
jest.mock('../../scripts/actions/WorkoutStoreActionCreators.js');
jest.mock('../../scripts/actions/TrainingStoreActionCreators.js');
jest.mock('../../scripts/actions/AppStateActionCreators.js');
jest.mock('react-router');
jest.mock('../../scripts/stores/WorkoutStore.js');
jest.mock('../../scripts/stores/ExerciseStore.js');
jest.mock('../../scripts/stores/TrainingStore.js');
jest.mock('../../scripts/stores/AppState.js');
jest.mock('../../scripts/components/forms/TrainingForm.js');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    WorkoutStoreActionCreators = require('../../scripts/actions/WorkoutStoreActionCreators.js'),
    TrainingStoreActionCreators = require('../../scripts/actions/TrainingStoreActionCreators.js'),
    Immutable = require('immutable'),
    AppStateActionCreators = require('../../scripts/actions/AppStateActionCreators.js'),
    WorkoutStore = require('../../scripts/stores/WorkoutStore.js'),
    ExerciseStore = require('../../scripts/stores/ExerciseStore.js'),
    TrainingStore = require('../../scripts/stores/TrainingStore.js'),
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
        TrainingStore.getTrainings.mockImplementation(() => {
            return Immutable.fromJS([
                {
                    id: 0
                } 
            ]);
        });
        ExerciseStore.getExercises.mockImplementation(() => {
            return Immutable.fromJS([
                {
                    id: 0,
                    label: 't1'
                },
                {
                    id: 1,
                    label: 't2'
                }
            ]);
        });
        training = TestUtils.renderIntoDocument(<Training />);
    });

    afterEach(() => {
        WorkoutStore.getWorkouts.mockClear();
        AppState.getActiveTraining.mockClear();
        AppState.getTimer.mockClear();
        AppStateActionCreators.closeModal.mockClear();
        AppStateActionCreators.finishTraining.mockClear();
        AppStateActionCreators.stopTimer.mockClear();
        AppStateActionCreators.openModal.mockClear();
        TrainingStoreActionCreators.addTraining.mockClear();
        training.componentWillUnmount();
    });

    it("renders a Training overview Page with a list of workouts if there is no active training", () => {
        let listItems = TestUtils.scryRenderedDOMComponentsWithClass(training, 'listitem');
        expect(TestUtils.isCompositeComponent(training)).toEqual(true);
        expect(training.getDOMNode().className).toEqual('page training');
        expect(listItems.length).toBe(2);
    });

    it("sets the timer and the activeTraining on change", () => {
        training._onChange();
        expect(AppState.getActiveTraining.mock.calls.length).toBe(2);
        expect(AppState.getTimer.mock.calls.length).toBe(2);
    });

    describe("startTraining", () => {
        it("starts the training when a workout is clicked", () => {
            let listItems = TestUtils.scryRenderedDOMComponentsWithClass(training, 'listitem');
            TestUtils.Simulate.click(listItems[0].getDOMNode());
            expect(AppStateActionCreators.startTraining.mock.calls.length).toBe(1);
            expect(AppStateActionCreators.startTraining.mock.calls[0][0].id).toBe(1);
        });
    });

    describe("finishTraining", () => {
        beforeEach(() => {
            AppState.getActiveTraining.mockImplementation(() => {
                return Immutable.fromJS({
                    workout: {
                        id: 1,
                        label: 'first',
                        exercises: ['1', '2']
                    },
                    currentExercise: 1,
                    sets: []
                });
            });
            training = TestUtils.renderIntoDocument(<Training />);
        });

        it("renders a Training overview Page if there is no active training", () => {
            let finishButton = TestUtils.scryRenderedDOMComponentsWithClass(training, 'finish');
            TestUtils.Simulate.click(finishButton[0].getDOMNode());
        });

        it("finishes and saves the training and redirects back to home on finish and yes", () => {
            training = TestUtils.renderIntoDocument(<Training />);
            let finishButton = TestUtils.scryRenderedDOMComponentsWithClass(training, 'finish');
            TestUtils.Simulate.click(finishButton[0].getDOMNode());
            let dialog = AppStateActionCreators.openModal.mock.calls[0][0];
            dialog.props.yesHandler();
            expect(AppStateActionCreators.closeModal.mock.calls.length).toBe(1);
            expect(AppStateActionCreators.stopTimer.mock.calls.length).toBe(1);
            expect(AppStateActionCreators.finishTraining.mock.calls.length).toBe(1);
            expect(TrainingStoreActionCreators.addTraining.mock.calls.length).toBe(1);
            expect(Router.Navigation.transitionTo.mock.calls.length).toBe(1);
        });

        it("closes the modal on finish and no", () => {
            let finishButton = TestUtils.scryRenderedDOMComponentsWithClass(training, 'finish');
            TestUtils.Simulate.click(finishButton[0].getDOMNode());
            let dialog = AppStateActionCreators.openModal.mock.calls[0][0];
            dialog.props.noHandler();
            expect(AppStateActionCreators.closeModal.mock.calls.length).toBe(1);
        });
    });

    describe("exerciseClickHandler", () => {
        it("it sets the current exercise", () => {
            training.exerciseClickHandler(null, {id: 0}, 0);
            expect(AppStateActionCreators.setCurrentExercise.mock.calls.length).toBe(1);
        });
    });

    describe("formSubmitHandler", () => {
        it("saves the current set", () => {
            training.formSubmitHandler(0, 5, 10);
            expect(AppStateActionCreators.addSet.mock.calls.length).toBe(1);
            expect(AppStateActionCreators.startTimer.mock.calls.length).toBe(1);
        });
    });
});

