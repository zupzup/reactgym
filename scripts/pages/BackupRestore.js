'use strict';

var React = require('react'),
    List = require('../components/List'),
    SimpleHeaderMixin = require('../mixins/SimpleHeaderMixin'),
    PureRenderMixin = require('react').addons.PureRenderMixin,
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    BackupUtil = require('../utils/BackupUtil');

var Home = React.createClass({
    header: {
        title: 'Backup / Restore'
    },
    mixins: [SimpleHeaderMixin, PureRenderMixin],

    getInitialState() {
        return {};
    },

    handleBackup() {
    },

    handleRestore(e, item, index) {
        AppStateActionCreators.openModal(<div>{item.label} {index}</div>);
    },

    render() {
        var handlers = {
            default: this.handleRestore
        },
            backups = BackupUtil.getBackups();
        return (
            <div className='page backup'>
                <h2><i className='ion-folder'></i> Restore from Backup:</h2>
                <List handlers={handlers} editAble={false} items={backups.toJS()}></List>
                <button className='backupButton' onClick={this.handleBackup}>Backup now</button>
            </div>
        );
    }
});

module.exports = Home;

