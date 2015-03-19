'use strict';

jest.dontMock('../scripts/App.js');
jest.mock('react-router');
jest.mock('../scripts/stores/AppState.js');
jest.mock('../scripts/actions/AppStateActionCreators.js');
jest.mock('../scripts/components/Header.js');
jest.mock('../scripts/components/Menu.js');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    AppStateActionCreators = require('../scripts/actions/AppStateActionCreators'),
    AppState = require('../scripts/stores/AppState.js'),
    App = require('../scripts/App.js'),
    Router = require('react-router'),
    StubRouterContext = require('../StubRouterContext.js');

Router.RouteHandler = React.createClass({
    render() {
        return <div>hello</div>;
    }
});

describe("App", () => {
    let app,
        ContextComponent,
        wrapped;
    beforeEach(() => {
        ContextComponent = StubRouterContext(App, {}, {
            getCurrentPath: () => {
                return '123';
            }
        });
        AppState.getNextTransition.mockImplementation(() => {
            return 'slide';
        });
        AppState.getAll.mockImplementation(() => {
            return {
                nextTransition: 'slide',
                menuOpen: false,
                modal: null
            };
        });
        wrapped = TestUtils.renderIntoDocument(<ContextComponent />);
        app = TestUtils.findRenderedComponentWithType(wrapped, App);
    });

    afterEach(() => {
        AppState.getAll.mockClear();
        AppState.getNextTransition.mockClear();
        AppStateActionCreators.closeMenu.mockClear();
        AppStateActionCreators.closeModal.mockClear();
    });

    it("renders an App", () => {
        expect(TestUtils.isCompositeComponent(app)).toEqual(true);
        expect(app.getDOMNode().className).toEqual("App");
        app.componentWillUnmount();
    });

    it("gets the appstate onchange", () => {
        app._onChange();
        expect(AppState.getAll.mock.calls.length).toBe(2);
    });

    describe("openMenu", () => {
        beforeEach(() => {
            AppState.getAll.mockImplementation(() => {
                return {
                    nextTransition: 'slide',
                    menuOpen: true,
                    modal: null
                };
            });
            wrapped = TestUtils.renderIntoDocument(<ContextComponent />);
            app = TestUtils.findRenderedComponentWithType(wrapped, App);
        });

        it("sets the menu to open on menuOpen and renders a mask", () => {
            let contentArea = TestUtils.findRenderedDOMComponentWithClass(app, 'contentArea');
            let mask = TestUtils.findRenderedDOMComponentWithClass(app, 'mask');
            expect(contentArea.getDOMNode().className).toBe('contentArea open');
            expect(mask.getDOMNode().className).toBe('mask');
        });

        it("it closes the menu on clicking the mask", () => {
            let mask = TestUtils.findRenderedDOMComponentWithClass(app, 'mask');
            TestUtils.Simulate.click(mask.getDOMNode());
            expect(AppStateActionCreators.closeMenu.mock.calls.length).toBe(1);
        });
    });

    describe("openModal", () => {
        beforeEach(() => {
            AppState.getAll.mockImplementation(() => {
                return {
                    nextTransition: 'slide',
                    menuOpen: false,
                    modal: '5'
                };
            });
            wrapped = TestUtils.renderIntoDocument(<ContextComponent />);
            app = TestUtils.findRenderedComponentWithType(wrapped, App);
        });
        it("sets the modal to open if there is a modal and renders a mask", () => {
            let modal = TestUtils.findRenderedDOMComponentWithClass(app, 'modal');
            let mask = TestUtils.findRenderedDOMComponentWithClass(app, 'mask');
            expect(mask.getDOMNode().className).toBe('mask modalOpen');
            expect(modal.getDOMNode().className).toBe('modal open');
        });

        it("it closes the modal on clicking the mask", () => {
            let mask = TestUtils.findRenderedDOMComponentWithClass(app, 'mask');
            TestUtils.Simulate.click(mask.getDOMNode());
            expect(AppStateActionCreators.closeModal.mock.calls.length).toBe(1);
        });
    });
});

