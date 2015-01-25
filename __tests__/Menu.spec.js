'use strict';

jest.dontMock('../scripts/components/Menu.js');
var React = require('react/addons'),
    Router = require('react-router'),
    TestUtils = React.addons.TestUtils,
    Menu = require('../scripts/components/Menu.js');

describe("Menu", () => {
    let menu,
        Context;
    beforeEach(() => {
        Context = {
            getCurrentRoutes: () => {
                return ['ello'];
            }
        };
        menu = React.withContext(Context, () => {
            return TestUtils.renderIntoDocument(<Menu />);
        });
    });

    it("renders a Menu", () => {
        expect(TestUtils.isCompositeComponent(menu)).toEqual(true);
        expect(menu.getDOMNode().className).toEqual("menu");
    });
});

