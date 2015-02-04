'use strict';

jest.dontMock('../../scripts/components/Header.js');
jest.mock('../../scripts/stores/HeaderState.js');
jest.mock('../../scripts/actions/HeaderStateActionCreators.js');
jest.mock('react-router');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Header = require('../../scripts/components/Header.js'),
    HeaderState = require('../../scripts/stores/HeaderState'),
    Router = require('react-router'),
    Router,
    HeaderState;

describe("Header", () => {
    var header;
    beforeEach(() => {
        Router.State.getRoutes.mockImplementation(() => {
            return [{name: 'home'}];
        });
        HeaderState.getConfig.mockImplementation(() => {
            return {
                back: true,
                title: {
                    visible: true,
                    text: 'sample'
                },
                add: {
                    visible: true,
                    handler: () => {}
                },
                editMode: {
                    visible: true,
                    handler: () => {}
                }
            };
        });
        header = TestUtils.renderIntoDocument(<Header />);
    });

    afterEach(() => {
        header.componentWillUnmount();
        Router.State.getRoutes.mockClear();
        HeaderState.getConfig.mockClear();
    });

    it("renders a Header", () => {
        expect(TestUtils.isCompositeComponent(header)).toEqual(true);
        expect(header.getDOMNode().className).toEqual('header');
    });

    it("renders a title, addbutton, editbutton and backbutton", () => {
        header = TestUtils.renderIntoDocument(<Header />);
        let backSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'back');
        let titleSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headertitle');
        let addSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headeradd');
        let editSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headeredit');
        expect(backSpan.getDOMNode().textContent).toEqual('<');
        expect(titleSpan.getDOMNode().textContent).toEqual('sample');
        expect(addSpan.getDOMNode().textContent).toEqual('add');
        expect(editSpan.getDOMNode().textContent).toEqual('edit');
    });

    it("triggers a transition to home, if there is no history", () => {
        header.transitionTo = jest.genMockFunction();
        let backSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'back');
        TestUtils.Simulate.click(backSpan.getDOMNode());
        expect(header.transitionTo.mock.calls.length).toBe(1);
    });

    it("triggers router-back on click on back", () => {
        history.pushState({foo: 'bar'}, "page", "foo.html");
        header.goBack = jest.genMockFunction();
        let backSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'back');
        TestUtils.Simulate.click(backSpan.getDOMNode());
        expect(header.goBack.mock.calls.length).toBe(1);
    });
 
    it("shows no back button on homepage", () => {
        let backSpan = TestUtils.scryRenderedDOMComponentsWithClass(header, 'back hide');
        expect(backSpan.length).toBe(1);
    });
 
    it("shows a back button on other pages, if there is a history", () => {
        Router.State.getRoutes.mockClear();
        Router.State.getRoutes.mockImplementation(() => {
            return [{name: 'notHome'}];
        });
        history.pushState({foo: 'bar'}, "page", "foo.html");
        let newHeader = TestUtils.renderIntoDocument(<Header />);
        let backSpan = TestUtils.scryRenderedDOMComponentsWithClass(newHeader, 'back hide');
        expect(backSpan.length).toBe(0);
    });

    it("shows no buttons, if none are configured", () => {
        HeaderState.getConfig.mockImplementation(() => {
            return {};
        });
        let newHeader = TestUtils.renderIntoDocument(<Header />);
        let title = TestUtils.scryRenderedDOMComponentsWithClass(newHeader, 'headertitle');
        expect(title.length).toBe(0);
    });

    it("sets the state from the headerstore on change", () => {
        header._onChange();
        expect(Object.keys(header.state.config).length).toBe(4);
    });
});

