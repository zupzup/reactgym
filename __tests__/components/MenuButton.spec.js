'use strict';

jest.dontMock('../../scripts/components/MenuButton.js');
let React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    MenuButton = require('../../scripts/components/MenuButton.js');

describe("MenuButton", () => {
    it("renders a menubutton", () => {
        let handlerFunc = () => {};
        let button = TestUtils.renderIntoDocument(
            <MenuButton name="hello" handler={handlerFunc}></MenuButton>
        );
        expect(TestUtils.isCompositeComponent(button)).toEqual(true);
        expect(button.getDOMNode().textContent).toEqual("hello");
    });

    it("renders a menubutton with an icon, if specified", () => {
        let handlerFunc = () => {};
        let button = TestUtils.renderIntoDocument(
            <MenuButton icon='styles/hello' name="hello" handler={handlerFunc}></MenuButton>
        );
        let img = TestUtils.findRenderedDOMComponentWithTag(button, 'img');
        expect(img.getDOMNode().src).toContain('styles/hello');
        expect(button.getDOMNode().textContent).toEqual("hello");
    });

    it("executes the handler when clicked", () => {
        let handlerFunc = jest.genMockFunction();
        let button = TestUtils.renderIntoDocument(
            <MenuButton name="hello" handler={handlerFunc}></MenuButton>
        );
        TestUtils.Simulate.click(button.getDOMNode());
        expect(handlerFunc.mock.calls.length).toBe(1);
    });
});

