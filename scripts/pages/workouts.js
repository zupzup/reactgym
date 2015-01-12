'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    WorkoutStoreActionCreators = require('../actions/WorkoutStoreActionCreators'),
    WorkoutStore = require('../stores/WorkoutStore'),
    Router = require('react-router');

var Workouts = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {
            workouts: WorkoutStore.getWorkouts(),
            editAble: false
        };
    },

    deleteHandler: function(e, item, index) {
        WorkoutStoreActionCreators.removeWorkout(index);
    },

    defaultHandler: function(e, item, index) {
        console.log(item, index);
    },

    render: function() {
            var handlers = {
                default: this.defaultHandler,
                delete: this.deleteHandler
            }

        return (
            <div className='page workouts'>
                <List editAble={this.state.editAble} handlers={handlers} items={this.state.workouts}></List>
            </div>
        );
    },

    componentDidMount: function() {
        var self = this;
        WorkoutStore.addChangeListener(this._onChange);
        HeaderStateActionCreators.setConfig({
            back: true,
            title:  {
                visible: true,
                text: 'Workouts'
            },
            add: {
                visible: true,
                handler: function() {
                    console.log('add workout');
                }
            },
            editMode: {
                visible: true,
                handler: function() {
                    self.setState({editAble: !self.state.editAble})
                }
            }
        });
    },

    componentWillUnmount: function() {
        WorkoutStore.removeChangeListener(this._onChange);
        HeaderStateActionCreators.resetConfig();
    },

    _onChange: function() {
        this.setState({workouts: WorkoutStore.getWorkouts()});
    }
});

module.exports = Workouts;

