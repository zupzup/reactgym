'use strict';

jest.dontMock('../scripts/components/List.js');
let React = require('react/addons'),
    Router = require('react-router'),
    TestUtils = React.addons.TestUtils,
    List = require('../scripts/components/List.js');

describe("List", () => {
    it("renders a List", () => {
        let list = TestUtils.renderIntoDocument(<List items={[]} />);
        expect(TestUtils.isCompositeComponent(list)).toEqual(true);
    });
});

