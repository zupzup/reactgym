'use strict';

import React from 'react';
import List from '../components/List';
import SimpleHeaderMixin from '../mixins/SimpleHeaderMixin';
import BackupStoreActionCreators from '../actions/BackupStoreActionCreators';
import BackupStore from '../stores/BackupStore';
import ExerciseStore from '../stores/ExerciseStore';
import WorkoutStore from '../stores/WorkoutStore';
import TrainingStore from '../stores/TrainingStore';
import AppStateActionCreators from '../actions/AppStateActionCreators';

var BackupRestore = React.createClass({
    header: {
        title: 'Backup / Restore'
    },
    mixins: [SimpleHeaderMixin, React.addons.PureRenderMixin],

    getInitialState() {
        return {
            backups: BackupStore.getBackups(),
            loading: BackupStore.getLoading()
        };
    },

    handleBackup() {
        var backup = {
            exercises: ExerciseStore.getExercises(),
            workouts: WorkoutStore.getWorkouts(),
            trainings: TrainingStore.getTrainings()
        };
        BackupStoreActionCreators.addBackup(backup);
    },

    handleRestoreClick(item) {
        BackupStoreActionCreators.restoreFromBackup(item.label);
        AppStateActionCreators.closeModal();
    },

    handleRestore(e, item) {
        AppStateActionCreators.openModal(
            <div className="restoreState">
                <h1>Restore this state?</h1>
                <div>{item.label}</div>
                <div>
                    <button className='yes' onClick={this.handleRestoreClick.bind(null, item)}>Restore</button>
                </div>
            </div>
        );
    },

    render() {
        if (!window.requestFileSystem) {
            return (
                <div className='page backup disabled'>
                    <h3>This feature is disabled in the browser.</h3>
                </div>
            );
        }
        let handlers = {
                default: this.handleRestore
            },
            loadingClass = this.state.loading ? ' loading' : '';
        return (
            <div className='page backup'>
                <div className={'loadingindicator' + loadingClass}>
                    <i className='refreshButton ion-loop rotating'></i></div>
                <h2><i className='ion-folder'></i> Backups:</h2>
                <List handlers={handlers} editAble={false} items={this.state.backups.toJS()} />
                <button className='backupButton' onClick={this.handleBackup}>Backup now</button>
            </div>
        );
    },

    componentDidMount() {
        BackupStore.addChangeListener(this._onChange);
        BackupStoreActionCreators.getBackups();
    },

    componentWillUnmount() {
        BackupStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({
            backups: BackupStore.getBackups(),
            loading: BackupStore.getLoading()
        });
    }
});

module.exports = BackupRestore;
