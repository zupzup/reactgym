jest.dontMock('../scripts/components/Modal.js');
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Modal = require('../scripts/components/Modal.js');

describe("Modal", function() {
    it("renders a Modal", function() {
        var handlerFunc = function() {};
        var modal = TestUtils.renderIntoDocument(
            <Modal content="hello" closeHandler={handlerFunc} />
        );
        expect(TestUtils.isCompositeComponent(modal)).toEqual(true);
        expect(modal.getDOMNode().textContent).toEqual("hello");
        expect(modal.getDOMNode().className).toEqual("modal open");
    });

    it("is closed if content is null", function() {
        var handlerFunc = function() {};
        var modal = TestUtils.renderIntoDocument(
            <Modal content={null} closeHandler={handlerFunc} />
        );
        expect(modal.getDOMNode().className).toEqual("modal ");
    });

    it("executes the closeHandler when the close button is clicked", function() {
        var handlerFunc = jest.genMockFunction();
        var modal = TestUtils.renderIntoDocument(
            <Modal content="hello" closeHandler={handlerFunc} />
        );
        var closeSpan = TestUtils.findRenderedDOMComponentWithClass(modal, 'close');
        TestUtils.Simulate.click(closeSpan.getDOMNode());
        expect(handlerFunc.mock.calls.length).toBe(1);
    });
});

