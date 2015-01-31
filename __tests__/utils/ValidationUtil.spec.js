'use strict';

jest.dontMock('../../scripts/components/Menu.js');
var ValidationUtil = require('../../scripts/utils/ValidationUtil.js');

describe("ValidationUtil", () => {
    describe("getValidationFunction", () => {
        it("returns a number validator", () => {
            expect(ValidationUtil.getValidationFunction('number').test(5)).toBe(true);
            expect(ValidationUtil.getValidationFunction('number').test(null)).toBe(false);
            expect(ValidationUtil.getValidationFunction('number').test('hello')).toBe(false);
        });

        it("defaults to a string validator", () => {
            expect(ValidationUtil.getValidationFunction().test('5')).toBe(true);
        });
    });
});

