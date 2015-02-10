'use strict';

jest.dontMock('../../../scripts/components/forms/TrainingForm.js');
jest.mock('../../../scripts/actions/AppStateActionCreators.js');
jest.mock('../../../scripts/actions/WorkoutStoreActionCreators.js');
jest.mock('../../../scripts/stores/ExerciseStore.js');
let React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    AppStateActionCreators = require('../../../scripts/actions/AppStateActionCreators'),
    ExerciseStore = require('../../../scripts/stores/ExerciseStore.js'),
    Immutable = require('immutable'),
    TrainingForm = require('../../../scripts/components/forms/TrainingForm.js');

describe("TrainingForm", () => {
    var setData = Immutable.fromJS([{weight: 5, reps: 5}]);
    beforeEach(() => {
        ExerciseStore.getExerciseForId.mockImplementation(() => {
            return Immutable.fromJS({
                id: 0,
                label: 'hello'
            });
        });
    });

    afterEach(() => {
        ExerciseStore.getExerciseForId.mockClear();
        AppStateActionCreators.removeSet.mockClear(); 
    });

    it("renders a TrainingForm", () => {
        let trainingForm = TestUtils.renderIntoDocument(
            <TrainingForm sets={setData} exercise={0}/>
        );
        expect(TestUtils.isCompositeComponent(trainingForm)).toEqual(true);
        expect(trainingForm.getDOMNode().className).toEqual("form training");
    });

    it("calls the handler on submit", () => {
        let handler = jest.genMockFunction();
        let trainingForm = TestUtils.renderIntoDocument(
            <TrainingForm sets={setData} exercise={0} handler={handler}/>
        );
        let submitButton = TestUtils.findRenderedDOMComponentWithClass(trainingForm, 'submitButton');
        trainingForm.refs.reps.validateAndSetValue(5);
        trainingForm.refs.weight.validateAndSetValue(5);
        TestUtils.Simulate.click(submitButton.getDOMNode());
        expect(handler.mock.calls.length).toBe(1);
    });

    it("doesn't call the handler, if either field is invalid", () => {
        let handler = jest.genMockFunction();
        let trainingForm = TestUtils.renderIntoDocument(
            <TrainingForm sets={setData} exercise={0} handler={handler}/>
        );
        let submitButton = TestUtils.findRenderedDOMComponentWithClass(trainingForm, 'submitButton');
        trainingForm.refs.reps.validateAndSetValue('k');
        trainingForm.refs.weight.validateAndSetValue('');
        TestUtils.Simulate.click(submitButton.getDOMNode());
        expect(handler.mock.calls.length).toBe(0);
    });

    it("removes sets on click", () => {
        let trainingForm = TestUtils.renderIntoDocument(
            <TrainingForm sets={setData} exercise={0}/>
        );
        let set = TestUtils.findRenderedDOMComponentWithClass(trainingForm, 'rep');
        TestUtils.Simulate.click(set.getDOMNode());
        expect(AppStateActionCreators.removeSet.mock.calls.length).toBe(1);
    });
});

