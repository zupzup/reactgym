'use strict';

jest.dontMock('../../../scripts/components/forms/WorkoutForm.js');
jest.mock('../../../scripts/actions/AppStateActionCreators.js');
jest.mock('../../../scripts/actions/WorkoutStoreActionCreators.js');
jest.mock('../../../scripts/stores/ExerciseStore.js');
let React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Immutable = require('immutable'),
    AppStateActionCreators = require('../../../scripts/actions/AppStateActionCreators'),
    WorkoutStoreActionCreators = require('../../../scripts/actions/WorkoutStoreActionCreators.js'),
    ExerciseStore = require('../../../scripts/stores/ExerciseStore.js'),
    WorkoutForm = require('../../../scripts/components/forms/WorkoutForm.js');

describe("WorkoutForm", () => {
    beforeEach(() => {
        ExerciseStore.getExercises.mockImplementation(() => {
            return Immutable.fromJS([
                {
                    id: 1,
                    label: 'T-Bar-Rows'
                },
                {
                    id: 2,
                    label: 'Hammercurls'
                }
            ]);
        });
    });

    afterEach(() => {
        ExerciseStore.getExercises.mockClear();
        AppStateActionCreators.finishTraining.mockClear();
        AppStateActionCreators.closeModal.mockClear();
        WorkoutStoreActionCreators.updateWorkout.mockClear();
        WorkoutStoreActionCreators.addWorkout.mockClear();
    });

    it("renders a WorkoutForm", () => {
        let workoutForm = TestUtils.renderIntoDocument(
            <WorkoutForm />
        );
        expect(TestUtils.isCompositeComponent(workoutForm)).toEqual(true);
        expect(workoutForm.getDOMNode().className).toEqual("form workouts");
    });

    it("closes the modal on cancel", () => {
        let workoutForm = TestUtils.renderIntoDocument(
            <WorkoutForm />
        );
        let cancelButton = TestUtils.findRenderedDOMComponentWithClass(workoutForm, 'cancelButton');
        TestUtils.Simulate.click(cancelButton.getDOMNode());
        expect(AppStateActionCreators.closeModal.mock.calls.length).toBe(1);
    });

    it("saves the workout and closes the modal on submit", () => {
        let workoutForm = TestUtils.renderIntoDocument(
            <WorkoutForm />
        );
        let submitButton = TestUtils.findRenderedDOMComponentWithClass(workoutForm, 'submitButton');
        TestUtils.Simulate.click(submitButton.getDOMNode());
        expect(AppStateActionCreators.closeModal.mock.calls.length).toBe(1);
        expect(AppStateActionCreators.finishTraining.mock.calls.length).toBe(1);
        expect(WorkoutStoreActionCreators.addWorkout.mock.calls.length).toBe(1);
    });

    it("updates the workout and closes the modal on submit if in edit mode", () => {
        let workout = {
            label: 'hello',
            exercises: ['0', '1']
        };
        let workoutForm = TestUtils.renderIntoDocument(
            <WorkoutForm edit={true} workout={workout}/>
        );
        let submitButton = TestUtils.findRenderedDOMComponentWithClass(workoutForm, 'submitButton');
        TestUtils.Simulate.click(submitButton.getDOMNode());
        expect(AppStateActionCreators.finishTraining.mock.calls.length).toBe(1);
        expect(AppStateActionCreators.closeModal.mock.calls.length).toBe(1);
        expect(WorkoutStoreActionCreators.updateWorkout.mock.calls.length).toBe(1);
    });
});

