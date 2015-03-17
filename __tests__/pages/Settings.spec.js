'use strict';

jest.dontMock('../../scripts/pages/Settings.js');
jest.mock('../../scripts/stores/SettingsStore.js');
jest.mock('../../scripts/actions/SettingsStoreActionCreators.js');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    SettingsStoreActionCreators = require('../../scripts/actions/SettingsStoreActionCreators.js'),
    SettingsStore = require('../../scripts/stores/SettingsStore.js'),
    Settings = require('../../scripts/pages/Settings.js');

describe("Settings", () => {
    var settings;
    beforeEach(() => {
        SettingsStore.getRestTimer.mockImplementation(() => {
            return 90;
        });
        settings = TestUtils.renderIntoDocument(<Settings />);
    });

    afterEach(() => {
        SettingsStore.getRestTimer.mockClear();
        settings.componentWillUnmount();
    });

    it("renders a Settings Page", () => {
        expect(TestUtils.isCompositeComponent(settings)).toEqual(true);
        expect(settings.getDOMNode().className).toEqual('page settings');
    });

    it("changes the restTimer on change", () => {
        let input = TestUtils.findRenderedDOMComponentWithTag(settings, 'input');
        TestUtils.Simulate.change(input, {target: {value: 50}});
        expect(SettingsStoreActionCreators.setRestTimer.mock.calls.length).toBe(1);
    });

    it("sets the restTimer on change", () => {
        settings._onChange();
        expect(SettingsStore.getRestTimer.mock.calls.length).toBe(2);
    });
});

