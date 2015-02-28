'use strict';

var React = require('react'),
    List = require('../components/List'),
    SimpleHeaderMixin = require('../mixins/SimpleHeaderMixin'),
    PureRenderMixin = require('react').addons.PureRenderMixin,
    BackupStoreActionCreators = require('../actions/BackupStoreActionCreators'),
    BackupStore = require('../stores/BackupStore'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    BackupUtil = require('../utils/BackupUtil');

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
        var backup = {};
        // TODO: get exercises, workouts, trainings from localstorage
        // and att them to backup
        BackupStoreActionCreators.addBackup(backup);
    },

    handleRestore(e, item, index) {
        AppStateActionCreators.openModal(<div>Restore this state? {item.label} {index}</div>);
    },

    render() {
        var handlers = {
            default: this.handleRestore
        };
        return (
            <div className='page backup'>
                <h2><i className='ion-folder'></i> Backups:</h2>
                <i className='refreshButton ion-loop' onClick={this.refreshBackups}></i>
                <List handlers={handlers} editAble={false} items={this.state.backups.toJS()}></List>
                <button className='backupButton' onClick={this.handleBackup}>Backup now</button>
            </div>
        );
    }
});

module.exports = BackupRestore;

