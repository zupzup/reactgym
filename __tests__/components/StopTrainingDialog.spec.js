'use strict';

jest.dontMock('../../scripts/components/StopTrainingDialog.js');
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    StopTrainingDialog = require('../../scripts/components/StopTrainingDialog.js');

describe("StopTrainingDialog", () => {
    it("renders a stop Training dialog", () => {
        let stopTraining = TestUtils.renderIntoDocument(<StopTrainingDialog />);
        expect(TestUtils.isCompositeComponent(stopTraining)).toEqual(true);
        expect(stopTraining.getDOMNode().className).toEqual("stopTraining");
    });

    it("triggers the yesHandler when clicking on yes", () => {
        let yesHandler = jest.genMockFunction();
        let stopTraining = TestUtils.renderIntoDocument(<StopTrainingDialog yesHandler={yesHandler} />);
        let yesButton = TestUtils.findRenderedDOMComponentWithClass(stopTraining, 'yes');
        TestUtils.Simulate.click(yesButton.getDOMNode());
        expect(yesHandler.mock.calls.length).toBe(1);
    });

    it("triggers the noHandler when clicking on no", () => {
        let noHandler = jest.genMockFunction();
        let stopTraining = TestUtils.renderIntoDocument(<StopTrainingDialog noHandler={noHandler} />);
        let noButton = TestUtils.findRenderedDOMComponentWithClass(stopTraining, 'no');
        TestUtils.Simulate.click(noButton.getDOMNode());
        expect(noHandler.mock.calls.length).toBe(1);
    });
});

