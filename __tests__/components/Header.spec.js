'use strict';

jest.dontMock('../../scripts/components/Header.js');
jest.mock('../../scripts/stores/HeaderState.js');
jest.mock('../../scripts/actions/HeaderStateActionCreators.js');
jest.mock('react-router');

let React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Header = require('../../scripts/components/Header.js'),
    HeaderState = require('../../scripts/stores/HeaderState'),
    StubRouterContext = require('../../StubRouterContext.js');

describe("Header", () => {
    let header,
        wrapped,
        ContextComponent = StubRouterContext(Header);
    beforeEach(() => {
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
        wrapped = TestUtils.renderIntoDocument(<ContextComponent/>);
        header = TestUtils.findRenderedComponentWithType(wrapped, Header);
    });

    afterEach(() => {
        header.componentWillUnmount();
        HeaderState.getConfig.mockClear();
    });

    it("renders a Header", () => {
        expect(TestUtils.isCompositeComponent(header)).toEqual(true);
        expect(header.getDOMNode().className).toEqual('header');
    });

    it("renders a title, addbutton, editbutton and backbutton", () => {
        let backSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'back');
        let titleSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headertitle');
        let addSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headeradd');
        let editSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headeredit');
        expect(backSpan.getDOMNode()).not.toBe(undefined);
        expect(titleSpan.getDOMNode()).not.toBe(undefined);
        expect(addSpan.getDOMNode()).not.toBe(undefined);
        expect(editSpan.getDOMNode()).not.toBe(undefined);
    });

    it("triggers router-back on click on back", () => {
        history.pushState({foo: 'bar'}, "page", "foo.html");
        header.context.router.goBack = jest.genMockFunction();
        let backSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'back');
        TestUtils.Simulate.click(backSpan.getDOMNode());
        expect(header.context.router.goBack.mock.calls.length).toBe(1);
    });

    it("shows no back button on homepage", () => {
        let ContextComponent = StubRouterContext(Header, {}, {getCurrentPath: () => {
            return '/';
        }}),
            wrapped = TestUtils.renderIntoDocument(<ContextComponent />),
            newHeader = TestUtils.findRenderedComponentWithType(wrapped, Header),
            backSpan = TestUtils.scryRenderedDOMComponentsWithClass(newHeader, 'back hide');
        expect(backSpan.length).toBe(1);
    });

    it("shows a back button on other pages, if there is a history", () => {
        history.pushState({foo: 'bar'}, "page", "foo.html");
        let wrapped = TestUtils.renderIntoDocument(<ContextComponent/>);
        let newHeader = TestUtils.findRenderedComponentWithType(wrapped, Header);
        let backSpan = TestUtils.scryRenderedDOMComponentsWithClass(newHeader, 'back');
        expect(backSpan.length).toBe(1);
    });

    it("shows no buttons, if none are configured", () => {
        HeaderState.getConfig.mockImplementation(() => {
            return {};
        });
        let wrapped = TestUtils.renderIntoDocument(<ContextComponent/>);
        let newHeader = TestUtils.findRenderedComponentWithType(wrapped, Header);
        let title = TestUtils.scryRenderedDOMComponentsWithClass(newHeader, 'headertitle');
        expect(title.length).toBe(0);
    });

    it("sets the state from the headerstore on change", () => {
        header._onChange();
        expect(Object.keys(header.state.config).length).toBe(4);
    });
});

