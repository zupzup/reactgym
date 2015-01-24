'use strict';

jest.dontMock('../scripts/components/forms/ValidatedInput.js');
let React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    ValidatedInput = require('../scripts/components/forms/ValidatedInput.js');

describe("ValidatedInput", () => {
    it("renders a ValidatedInput", () => {
        let handlerFunc = () => {};
        let input = TestUtils.renderIntoDocument(
                <ValidatedInput validator='string' placeholder='name' className='nameField' />
        );
        expect(TestUtils.isCompositeComponent(input)).toEqual(true);
        expect(input.getDOMNode().className).toEqual("nameField valid");
    });
});

