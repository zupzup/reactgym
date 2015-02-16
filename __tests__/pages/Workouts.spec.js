'use strict';

jest.dontMock('../../scripts/pages/Workouts.js');
jest.mock('../../scripts/actions/WorkoutStoreActionCreators.js');
jest.mock('../../scripts/actions/AppStateActionCreators.js');
jest.mock('../../scripts/stores/WorkoutStore.js');
jest.mock('../../scripts/stores/ExerciseStore.js');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Immutable = require('immutable'),
    WorkoutStoreActionCreators = require('../../scripts/actions/WorkoutStoreActionCreators.js'),
    AppStateActionCreators = require('../../scripts/actions/AppStateActionCreators.js'),
    WorkoutStore = require('../../scripts/stores/WorkoutStore.js'),
    ExerciseStore = require('../../scripts/stores/ExerciseStore.js'),
    Workouts = require('../../scripts/pages/Workouts.js');

describe("Workouts", () => {
    var workouts;
    beforeEach(() => {
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
        ExerciseStore.getExerciseForId.mockImplementation(() => {
            return Immutable.fromJS({
                label: 'hello'
            });
        });
        workouts = TestUtils.renderIntoDocument(<Workouts />);
    });

    afterEach(() => {
        workouts.componentWillUnmount();
        WorkoutStore.getWorkouts.mockClear();
        ExerciseStore.getExerciseForId.mockClear();
        AppStateActionCreators.openModal.mockClear();
    });

    it("renders a Workouts Page", () => {
        expect(TestUtils.isCompositeComponent(workouts)).toEqual(true);
        expect(workouts.getDOMNode().className).toEqual('page workouts');
    });

    it("gets workouts from the workoutstore on change", () => {
        workouts._onChange();
        expect(WorkoutStore.getWorkouts.mock.calls.length).toBe(2);
    });

    describe('deleteHandler', () => {
        it("deletes the workout", () => {
            workouts.deleteHandler(null, {id: 0}, 0);
            expect(WorkoutStoreActionCreators.removeWorkout.mock.calls.length).toBe(1);
        });
    });

    describe('defaultHandler', () => {
        it("shows the workout in a modal", () => {
            workouts.defaultHandler(null, {
                id: 0,
                exercises: [1, 2, 3]
            }, 0);
            expect(AppStateActionCreators.openModal.mock.calls.length).toBe(1);
        });
    });

    describe('editHandler', () => {
        it("opens a modal for editing", () => {
            workouts.editHandler(null, {id: 0}, 0);
            expect(AppStateActionCreators.openModal.mock.calls.length).toBe(1);
            expect(AppStateActionCreators.openModal.mock.calls[0][0].props.workout.id).toBe(0);
        });
    });

    describe('headerAdd', () => {
        it("opens a modal for adding a workout", () => {
            workouts.header.add();
            expect(AppStateActionCreators.openModal.mock.calls.length).toBe(1);
        });
    });
 
    describe('headerEdit', () => {
        it("sets the state to editAble", () => {
            workouts.header.edit.apply(workouts);
            expect(workouts.state.editAble).toBe(true);
        });
    });
});

