'use strict';

jest.dontMock('../../scripts/components/ListItem.js');
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    ListItem = require('../../scripts/components/ListItem.js');

describe("ListItem", () => {
    let handlers;

    beforeEach(() => {
        handlers = {
            default: jest.genMockFunction(),
            delete: jest.genMockFunction(),
            edit: jest.genMockFunction()
        };
    });

    it("renders a ListItem", () => {
        let listItem = TestUtils.renderIntoDocument(<ListItem active={true} handlers={handlers}/>);
        expect(TestUtils.isCompositeComponent(listItem)).toEqual(true);
        expect(listItem.getDOMNode().className).toEqual("listitem tappable active");
    });

    it("is not tappable, if there is no default handler", () => {
        let listItem = TestUtils.renderIntoDocument(<ListItem handlers={{}}/>);
        expect(listItem.getDOMNode().className).toEqual("listitem");
    });

    it("shows edit and delete if it's editable", () => {
        let listItem = TestUtils.renderIntoDocument(<ListItem editAble={true} handlers={handlers}/>);
        let editButton = TestUtils.scryRenderedDOMComponentsWithClass(listItem, 'edit show');
        let deleteButton = TestUtils.scryRenderedDOMComponentsWithClass(listItem, 'delete show');
        expect(editButton.length).toBe(1);
        expect(deleteButton.length).toBe(1);
    });

    it("triggers the defaultHandler if clicked on", () => {
        let listItem = TestUtils.renderIntoDocument(<ListItem handlers={handlers}/>);
        TestUtils.Simulate.click(listItem.getDOMNode());
        expect(handlers.default.mock.calls.length).toBe(1);
    });

    it("triggers the editHandler if the edit button is clicked", () => {
        let listItem = TestUtils.renderIntoDocument(<ListItem handlers={handlers}/>);
        let editButton = TestUtils.findRenderedDOMComponentWithClass(listItem, 'edit');
        TestUtils.Simulate.click(editButton.getDOMNode());
        expect(handlers.edit.mock.calls.length).toBe(1);
    });

    it("triggers the deleteHandler if the delete button is clicked", () => {
        let listItem = TestUtils.renderIntoDocument(<ListItem handlers={handlers}/>);
        let deleteButton = TestUtils.findRenderedDOMComponentWithClass(listItem, 'delete');
        TestUtils.Simulate.click(deleteButton.getDOMNode());
        expect(handlers.delete.mock.calls.length).toBe(1);
    });
});

