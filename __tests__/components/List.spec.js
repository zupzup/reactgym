'use strict';

jest.dontMock('../../scripts/components/List.js');
let React = require('react/addons'),
    Router = require('react-router'),
    TestUtils = React.addons.TestUtils,
    List = require('../../scripts/components/List.js');

describe("List", () => {
    it("renders a List", () => {
        let list = TestUtils.renderIntoDocument(<List items={[]} />);
        expect(TestUtils.isCompositeComponent(list)).toEqual(true);
    });

    it("renders multiple list items", () => {
        let list = TestUtils.renderIntoDocument(<List items={[{label: 'hello'}, {label: 'hola'}]} />);
        let listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, 'listitem');
        expect(listItems[0].getDOMNode().textContent).toContain('hello');
        expect(listItems[1].getDOMNode().textContent).toContain('hola');
    });

    it("triggers the given handler", () => {
        let mockHandler = jest.genMockFunction();
        let handlers = {
            default: mockHandler
        };
        let list = TestUtils.renderIntoDocument(<List handlers={handlers} items={[{
            label: 'hello'
        }]} />);
        let listItem = TestUtils.findRenderedDOMComponentWithClass(list, 'listitem');
        TestUtils.Simulate.click(listItem.getDOMNode());
        expect(mockHandler.mock.calls.length).toBe(1);
    });
});

