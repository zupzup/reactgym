'use strict';

jest.dontMock('../../scripts/components/Modal.js');
let React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Modal = require('../../scripts/components/Modal.js');

describe("Modal", () => {
    it("renders a Modal", () => {
        let handlerFunc = () => {};
        let modal = TestUtils.renderIntoDocument(
            <Modal content="hello" closeHandler={handlerFunc} />
        );
        expect(TestUtils.isCompositeComponent(modal)).toEqual(true);
        expect(modal.getDOMNode().textContent).toEqual("hello");
        expect(modal.getDOMNode().className).toEqual("modal open");
    });

    it("is closed if content is null", () => {
        let handlerFunc = () => {};
        let modal = TestUtils.renderIntoDocument(
            <Modal content={null} closeHandler={handlerFunc} />
        );
        expect(modal.getDOMNode().className).toEqual("modal ");
    });

    it("scrolles into view on change", () => {
        let handlerFunc = () => {};
        let modal = TestUtils.renderIntoDocument(
            <Modal content={null} closeHandler={handlerFunc} />
        );
        let mockFunc = jest.genMockFunction();
        modal.getDOMNode = jest.genMockFunction();
        modal.getDOMNode.mockImplementation(() => {
            return {
                scrollIntoView: mockFunc 
            };
        });
        modal.forceUpdate();
        expect(modal.getDOMNode.mock.calls.length).toBe(1);
        expect(mockFunc.mock.calls.length).toBe(1);
    });

    it("executes the closeHandler when the close button is clicked", () => {
        let handlerFunc = jest.genMockFunction();
        let modal = TestUtils.renderIntoDocument(
            <Modal content="hello" closeHandler={handlerFunc} />
        );
        let closeSpan = TestUtils.findRenderedDOMComponentWithClass(modal, 'close');
        TestUtils.Simulate.click(closeSpan.getDOMNode());
        expect(handlerFunc.mock.calls.length).toBe(1);
    });
});

