jest.dontMock('../scripts/components/forms/ValidatedInput.js');
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    ValidatedInput = require('../scripts/components/forms/ValidatedInput.js');

describe("ValidatedInput", function() {
    it("renders a ValidatedInput", function() {
        var handlerFunc = function() {};
        var input = TestUtils.renderIntoDocument(
                <ValidatedInput validator='string' placeholder='name' className='nameField' />
        );
        expect(TestUtils.isCompositeComponent(input)).toEqual(true);
        expect(input.getDOMNode().className).toEqual("nameField valid");
    });
});

