'use strict';

jest.dontMock('../../scripts/pages/exercises.js');
jest.mock('../../scripts/actions/WorkoutStoreActionCreators.js');
jest.mock('../../scripts/actions/ExerciseStoreActionCreators.js');
jest.mock('../../scripts/actions/AppStateActionCreators.js');
jest.mock('../../scripts/stores/ExerciseStore.js');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Exercises = require('../../scripts/pages/Exercises.js');

describe("Exercises", () => {
    var exercises;
    beforeEach(() => {
        ExerciseStore.getExercises.mockImplementation(() => {
            return [
                {
                    id: 0,
                    label: 'first'
                },
                {
                    id: 1,
                    label: 'second'
                } 
            ];
        });
        exercises = TestUtils.renderIntoDocument(<Exercises />);
    });

    afterEach(() => {
        exercises.componentWillUnmount();
        ExerciseStore.getExercises.mockClear();
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
            expect(WorkoutStoreActionCreators.removeExerciseFromWorkouts.mock.calls.length).toBe(1);
        });
    });
});

