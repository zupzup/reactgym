jest.dontMock('../scripts/components/MenuButton.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var MenuButton = require('../scripts/components/MenuButton.js');

describe("MenuButton", function() {
    it("renders a menubutton", function() {
        var handlerFunc = function() {};
        var button = TestUtils.renderIntoDocument(
            <MenuButton name="hello" handler={handlerFunc}></MenuButton>
        );
        expect(TestUtils.isCompositeComponent(button)).toEqual(true);
        expect(button.getDOMNode().textContent).toEqual("hello");
    });
});
