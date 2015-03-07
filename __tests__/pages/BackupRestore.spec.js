'use strict';

jest.dontMock('../../scripts/pages/BackupRestore.js');
jest.mock('../../scripts/stores/BackupStore.js');
jest.mock('../../scripts/actions/BackupStoreActionCreators.js');
jest.mock('../../scripts/actions/AppStateActionCreators.js');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    BackupStoreActionCreators = require('../../scripts/actions/BackupStoreActionCreators.js'),
    AppStateActionCreators = require('../../scripts/actions/AppStateActionCreators.js'),
    Immutable = require('immutable'),
    BackupStore = require('../../scripts/stores/BackupStore.js'),
    BackupRestore = require('../../scripts/pages/BackupRestore.js');

describe("BackupRestore", () => {
    var backupRestore;
    beforeEach(() => {
        BackupStore.getBackups.mockImplementation(() => {
            return Immutable.fromJS([
            
            ]);
        });
        backupRestore = TestUtils.renderIntoDocument(<BackupRestore />);
    });

    afterEach(() => {
        BackupStore.getBackups.mockClear();
        backupRestore.componentWillUnmount();
    });

    it("renders a Backup/Restore Page", () => {
        expect(TestUtils.isCompositeComponent(backupRestore)).toEqual(true);
        expect(backupRestore.getDOMNode().className).toEqual('page backup');
    });

    it("gets the backups on change", () => {
        backupRestore._onChange();
        expect(BackupStore.getBackups.mock.calls.length).toBe(2);
    });
});

