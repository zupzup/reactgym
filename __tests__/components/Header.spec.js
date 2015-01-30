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
        Router.State.getRoutes.mockClear();
        HeaderState.getConfig.mockClear();
    });

    it("renders a Header", () => {
        expect(TestUtils.isCompositeComponent(header)).toEqual(true);
        expect(header.getDOMNode().className).toEqual('header');
    });

    xit("renders a title, addbutton, editbutton and backbutton", () => {
        header = TestUtils.renderIntoDocument(<Header />);
        let backSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'back');
        let titleSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headertitle');
        let addSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headeradd');
        let editSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headeredit');
        expect(backSpan.getDOMNode().textContent).toEqual('back');
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
});

