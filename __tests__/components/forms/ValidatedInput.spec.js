'use strict';

jest.dontMock('../../../scripts/components/forms/ValidatedInput.js');
let React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    ValidatedInput = require('../../../scripts/components/forms/ValidatedInput.js');

describe("ValidatedInput", () => {
    it("renders a ValidatedInput", () => {
        let input = TestUtils.renderIntoDocument(
            <ValidatedInput validator='string' placeholder='name' className='nameField' />
        );
        expect(TestUtils.isCompositeComponent(input)).toEqual(true);
        expect(input.getDOMNode().className).toEqual("nameField valid");
    });

    it("shows that its valid", () => {
        let input = TestUtils.renderIntoDocument(
            <ValidatedInput validator='string' placeholder='name' />
        );
        TestUtils.Simulate.change(input, {target: {value: 'hello'}});
        expect(input.state.valid).toBe('valid');
    });

    it("shows that its invalid", () => {
        let input = TestUtils.renderIntoDocument(
            <ValidatedInput validator='number' placeholder='name' />
        );
        TestUtils.Simulate.change(input.getDOMNode(), {target: {value: 'hello'}});
        expect(input.state.valid).toBe('invalid');
    });

    it("resets the value on reset", () => {
        let input = TestUtils.renderIntoDocument(
            <ValidatedInput validator='number' placeholder='name' />
        );
        input.reset();
        expect(input.state.value).toBe('');
    });

    it("can get values externally", () => {
        let input = TestUtils.renderIntoDocument(
            <ValidatedInput validator='number' placeholder='name' />
        );
        input.setValue('5');
        expect(input.state.value).toBe('5');
    });

    it("scrolls to the component on Focus", () => {
        let input = TestUtils.renderIntoDocument(
            <ValidatedInput validator='number' placeholder='name' />
        );
        var scrollTop = input.getDOMNode().scrollHeight;
        TestUtils.Simulate.focus(input.getDOMNode());
        expect(input.getDOMNode().scrollTop).toEqual(scrollTop);
    });

    it("sets values if props change", () => {
        let input = TestUtils.renderIntoDocument(
            <ValidatedInput validator='number' placeholder='name' />
        );
        input.setProps({value: '5'});
        expect(input.state.value).toBe('5');
    });
});

