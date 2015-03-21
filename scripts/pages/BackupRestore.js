'use strict';

var React = require('react'),
    List = require('../components/List'),
    SimpleHeaderMixin = require('../mixins/SimpleHeaderMixin'),
    PureRenderMixin = require('react').addons.PureRenderMixin,
    BackupStoreActionCreators = require('../actions/BackupStoreActionCreators'),
    BackupStore = require('../stores/BackupStore'),
    ExerciseStore = require('../stores/ExerciseStore'),
    WorkoutStore = require('../stores/WorkoutStore'),
    TrainingStore = require('../stores/TrainingStore'),
    AppStateActionCreators = require('../actions/AppStateActionCreators');

var BackupRestore = React.createClass({
    header: {
        title: 'Backup / Restore'
    },
    mixins: [SimpleHeaderMixin, PureRenderMixin],

    refreshBackups() {
        BackupStoreActionCreators.getBackups();
    },

    getInitialState() {
        return {
            backups: BackupStore.getBackups()
        };
    },

    handleBackup() {
        var backup = {
            exercises: ExerciseStore.getExercises(),
            workouts: WorkoutStore.getWorkouts(),
            training: TrainingStore.getTrainings()
        };
        BackupStoreActionCreators.addBackup(backup);
    },

    handleRestore(e, item, index) {
        AppStateActionCreators.openModal(<div>Restore this state? {item.label} {index}</div>);
    },

    render() {
        let handlers = {
            default: this.handleRestore
        };
        return (
            <div className='page backup'>
                <h2><i className='ion-folder'></i> Backups:</h2>
                <i className='refreshButton ion-loop' onClick={this.refreshBackups}></i>
                <List handlers={handlers} editAble={false} items={this.state.backups.toJS()} />
                <button className='backupButton' onClick={this.handleBackup}>Backup now</button>
            </div>
        );
    },

    componentDidMount() {
        BackupStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        BackupStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({
            backups: BackupStore.getBackups()
        });
    }
});

module.exports = BackupRestore;

