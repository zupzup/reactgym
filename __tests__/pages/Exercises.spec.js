'use strict';

jest.dontMock('../../scripts/pages/Exercises.js');
jest.mock('../../scripts/actions/WorkoutStoreActionCreators.js');
jest.mock('../../scripts/actions/ExerciseStoreActionCreators.js');
jest.mock('../../scripts/actions/AppStateActionCreators.js');
jest.mock('../../scripts/stores/ExerciseStore.js');
let Immutable = require('immutable');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    WorkoutStoreActionCreators = require('../../scripts/actions/WorkoutStoreActionCreators.js'),
    ExerciseStoreActionCreators = require('../../scripts/actions/ExerciseStoreActionCreators.js'),
    AppStateActionCreators = require('../../scripts/actions/AppStateActionCreators.js'),
    ExerciseStore = require('../../scripts/stores/ExerciseStore.js'),
    Exercises = require('../../scripts/pages/Exercises.js');

describe("Exercises", () => {
    var exercises;
    beforeEach(() => {
        ExerciseStore.getExercises.mockImplementation(() => {
            return Immutable.fromJS([
                {
                    id: 0,
                    label: 'first'
                },
                {
                    id: 1,
                    label: 'second'
                } 
            ]);
        });
        exercises = TestUtils.renderIntoDocument(<Exercises />);
    });

    afterEach(() => {
        exercises.componentWillUnmount();
        ExerciseStore.getExercises.mockClear();
        AppStateActionCreators.openModal.mockClear();
        AppStateActionCreators.finishTraining.mockClear();
    });

    it("renders an Exercises Page", () => {
        expect(TestUtils.isCompositeComponent(exercises)).toEqual(true);
        expect(exercises.getDOMNode().className).toEqual('page exercises');
    });

    it("gets exercises from the exercisestore on change", () => {
        exercises._onChange();
        expect(ExerciseStore.getExercises.mock.calls.length).toBe(2);
    });

    describe('deleteHandler', () => {
        it("deletes the exercise and removes it from all workouts", () => {
            exercises.deleteHandler(null, {id: 0}, 0);
            expect(ExerciseStoreActionCreators.removeExercise.mock.calls.length).toBe(1);
            expect(AppStateActionCreators.finishTraining.mock.calls.length).toBe(1);
            expect(WorkoutStoreActionCreators.removeExerciseFromWorkouts.mock.calls.length).toBe(1);
        });
    });

    describe('editHandler', () => {
        it("renders an edit form", () => {
            exercises.editHandler(null, {id: 0}, 0);
            expect(AppStateActionCreators.openModal.mock.calls.length).toBe(1);
            expect(AppStateActionCreators.openModal.mock.calls[0][0].props.exercise.id).toBe(0);
        });
    });

    describe('headerAdd', () => {
        it("opens a modal for adding an exercise", () => {
            exercises.header.add();
            expect(AppStateActionCreators.openModal.mock.calls.length).toBe(1);
        });
    });
 
    describe('headerEdit', () => {
        it("sets the state to editAble", () => {
            exercises.header.edit.apply(exercises);
            expect(exercises.state.editAble).toBe(true);
        });
    });
});

