'use strict';

jest.dontMock('../scripts/components/Header.js');
var React = require('react/addons'),
    Router = require('react-router'),
    HeaderState = require('../scripts/stores/HeaderState'),
    HeaderStateActionCreators = require('../scripts/actions/HeaderStateActionCreators'),
    TestUtils = React.addons.TestUtils,
    Header = require('../scripts/components/Header.js');

describe("Header", () => {
    let header,
        Context;
    beforeEach(() => {
        HeaderState.init();
        Context = {
            getCurrentRoutes: () => {
                return ['ello'];
            }
        };
        header = React.withContext(Context, () => {
            return TestUtils.renderIntoDocument(<Header />);
        });
    });

    it("renders a Header", () => {
        let addSpan = TestUtils.scryRenderedDOMComponentsWithClass(header, 'yarr');
        expect(addSpan.length).toEqual(0);
        expect(TestUtils.isCompositeComponent(header)).toEqual(true);
        expect(header.getDOMNode().className).toEqual("header");
    });

    it("renders a title, addbutton, editbutton and backbutton", () => {
        HeaderStateActionCreators.setConfig({
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
        });
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
        HeaderStateActionCreators.setConfig({
            back: true
        });
        header.transitionTo = jest.genMockFunction();
        let backSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'back');
        TestUtils.Simulate.click(backSpan.getDOMNode());
        expect(header.transitionTo.mock.calls.length).toBe(1);
    });

    it("triggers router-back on click on back", () => {
        HeaderStateActionCreators.setConfig({
            back: true
        });
        history.pushState({foo: 'bar'}, "page", "foo.html");
        header.goBack = jest.genMockFunction();
        let backSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'back');
        TestUtils.Simulate.click(backSpan.getDOMNode());
        expect(header.goBack.mock.calls.length).toBe(1);
    });
});

