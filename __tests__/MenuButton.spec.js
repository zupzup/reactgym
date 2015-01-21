jest.dontMock('../scripts/components/MenuButton.js');
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    MenuButton = require('../scripts/components/MenuButton.js');

describe("MenuButton", function() {
    it("renders a menubutton", function() {
        var handlerFunc = function() {};
        var button = TestUtils.renderIntoDocument(
            <MenuButton name="hello" handler={handlerFunc}></MenuButton>
        );
        expect(TestUtils.isCompositeComponent(button)).toEqual(true);
        expect(button.getDOMNode().textContent).toEqual("hello");
    });

    it("executes the handler when clicked", function() {
        var handlerFunc = jest.genMockFunction();
        var button = TestUtils.renderIntoDocument(
            <MenuButton name="hello" handler={handlerFunc}></MenuButton>
        );
        TestUtils.Simulate.click(button.getDOMNode());
        expect(handlerFunc.mock.calls.length).toBe(1);
    });
});

