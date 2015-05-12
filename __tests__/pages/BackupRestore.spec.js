'use strict';

jest.dontMock('../../scripts/pages/BackupRestore.js');
jest.mock('../../scripts/stores/BackupStore.js');
jest.mock('../../scripts/stores/WorkoutStore.js');
jest.mock('../../scripts/stores/ExerciseStore.js');
jest.mock('../../scripts/stores/TrainingStore.js');
jest.mock('../../scripts/actions/BackupStoreActionCreators.js');
jest.mock('../../scripts/actions/AppStateActionCreators.js');

let React = require('react/addons'),
    Immutable = require('immutable'),
    BackupStoreActionCreators = require('../../scripts/actions/BackupStoreActionCreators.js'),
    AppStateActionCreators = require('../../scripts/actions/AppStateActionCreators.js'),
    BackupStore = require('../../scripts/stores/BackupStore.js'),
    WorkoutStore = require('../../scripts/stores/WorkoutStore.js'),
    ExerciseStore = require('../../scripts/stores/ExerciseStore.js'),
    TrainingStore = require('../../scripts/stores/TrainingStore.js'),
    BackupRestore = require('../../scripts/pages/BackupRestore.js');

let TestUtils = React.addons.TestUtils;

window.requestFileSystem = true;
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
        AppStateActionCreators.openModal.mockClear();
    });

    it("renders a Backup/Restore Page", () => {
        expect(TestUtils.isCompositeComponent(backupRestore)).toEqual(true);
        expect(backupRestore.getDOMNode().className).toEqual('page backup');
    });

    it("renders a feature unavailability page on desktop", () => {
        window.requestFileSystem = false;
        backupRestore = TestUtils.renderIntoDocument(<BackupRestore />);
        expect(backupRestore.getDOMNode().className).toEqual('page backup disabled');
        window.requestFileSystem = true;
    });

    it("shows a loading indicator if it is loading", () => {
        BackupStore.getLoading.mockImplementation(() => {
            return true;
        });
        backupRestore = TestUtils.renderIntoDocument(<BackupRestore />);
        expect(TestUtils.findRenderedDOMComponentWithClass(backupRestore, 'loading')).not.toBeUndefined();
    });

    it("gets the backups on change", () => {
        backupRestore._onChange();
        expect(BackupStore.getBackups.mock.calls.length).toBe(2);
    });

    describe("handleBackup", () => {
        it("calls addBackup with the current data", () => {
            backupRestore.handleBackup();
            expect(ExerciseStore.getExercises.mock.calls.length).toBe(1);
            expect(TrainingStore.getTrainings.mock.calls.length).toBe(1);
            expect(WorkoutStore.getWorkouts.mock.calls.length).toBe(1);
            expect(BackupStoreActionCreators.addBackup.mock.calls.length).toBe(1);
        });
    });

    describe("handleRestore", () => {
        it("opens a modal and shows a dialog for restoring a backup", () => {
            backupRestore.handleRestore(null, {label: 'helloBackup'});
            expect(AppStateActionCreators.openModal.mock.calls.length).toBe(1);
        });

        it("closes the modal and restores the Backup", () => {
            backupRestore.handleRestoreClick({label: 'helloBackup'});
            expect(AppStateActionCreators.closeModal.mock.calls.length).toBe(1);
            expect(BackupStoreActionCreators.restoreFromBackup.mock.calls.length).toBe(1);
        });
    });
});

