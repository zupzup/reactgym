'use strict';

jest.dontMock('../scripts/components/Header.js');
var React = require('react/addons'),
    Router = require('react-router'),
    HeaderState = require('../scripts/stores/HeaderState'),
    HeaderStateActionCreators = require('../scripts/actions/HeaderStateActionCreators'),
    TestUtils = React.addons.TestUtils,
    Header = require('../scripts/components/Header.js');

describe("Header", () => {
    beforeEach(() => {
        HeaderState.init();
    });

    it("renders a Header", () => {
        let Context = {
            getCurrentRoutes: () => {
                return ['ello'];
            }
        };
        let header = React.withContext(Context, () => {
            return TestUtils.renderIntoDocument(<Header />);
        });
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
        let Context = {
            getCurrentRoutes: () => {
                return ['ello'];
            }
        };
        let header = React.withContext(Context, () => {
            return TestUtils.renderIntoDocument(<Header />);
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
});

