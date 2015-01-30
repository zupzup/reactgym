'use strict';

jest.dontMock('../../scripts/components/Menu.js');
jest.mock('react-router');
jest.mock('../../scripts/stores/MenuStore.js');
jest.mock('../../scripts/actions/AppStateActionCreators.js');
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    AppStateActionCreators = require('../../scripts/actions/AppStateActionCreators'),
    Router = require('react-router'),
    MenuStore = require('../../scripts/stores/MenuStore.js'),
    Menu = require('../../scripts/components/Menu.js');

describe("Menu", () => {
    beforeEach(() => {
        Router.State.getRoutes.mockImplementation(() => {
            return ['123'];
        });
        MenuStore.getMenuPoints.mockImplementation(() => {
            return [
                {
                    name: 'Home',
                    link: 'home'
                },
                {
                    name: 'Exercises',
                    link: 'exercises'
                }
            ];
        });
    });

    afterEach(() => {
        Router.State.getRoutes.mockClear();
        MenuStore.getMenuPoints.mockClear();
    });

    it("renders a Menu", () => {
        let menu = TestUtils.renderIntoDocument(<Menu />);
        expect(TestUtils.isCompositeComponent(menu)).toEqual(true);
        expect(menu.getDOMNode().className).toEqual("menu");
    });

    it("renders a Menu with items", () => {
        let menu = TestUtils.renderIntoDocument(<Menu />);
        menu.transitionTo = jest.genMockFunction();
        let firstItem = TestUtils.scryRenderedDOMComponentsWithClass(menu, 'menubutton');
        TestUtils.Simulate.click(firstItem[0].getDOMNode());
        expect(AppStateActionCreators.closeMenu.mock.calls.length).toBe(1);
        expect(menu.transitionTo.mock.calls.length).toBe(1);
    });
});

