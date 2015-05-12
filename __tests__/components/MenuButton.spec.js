'use strict';

jest.dontMock('../../scripts/components/MenuButton.js');
let React = require('react/addons'),
    MenuButton = require('../../scripts/components/MenuButton.js');

let TestUtils = React.addons.TestUtils;

describe("MenuButton", () => {
    it("renders a menubutton", () => {
        let handlerFunc = () => {};
        let button = TestUtils.renderIntoDocument(
            <MenuButton name="hello" handler={handlerFunc} />
        );
        expect(TestUtils.isCompositeComponent(button)).toEqual(true);
        expect(button.getDOMNode().textContent).toEqual(" hello");
    });

    it("renders a menubutton with an icon, if specified", () => {
        let handlerFunc = () => {};
        let button = TestUtils.renderIntoDocument(
            <MenuButton icon='styles-hello' name="hello" handler={handlerFunc} />
        );
        let icon = TestUtils.findRenderedDOMComponentWithTag(button, 'i');
        expect(icon.getDOMNode().className).toContain('styles-hello');
        expect(button.getDOMNode().textContent).toEqual(" hello");
    });

    it("executes the handler when clicked", () => {
        let handlerFunc = jest.genMockFunction();
        let button = TestUtils.renderIntoDocument(
            <MenuButton name="hello" handler={handlerFunc} />
        );
        TestUtils.Simulate.click(button.getDOMNode());
        expect(handlerFunc.mock.calls.length).toBe(1);
    });
});

