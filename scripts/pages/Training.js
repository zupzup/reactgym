'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    WorkoutStore = require('../stores/WorkoutStore'),
    AppState = require('../stores/AppState');

var Training = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function() {
        return {activeTraining: !!AppState.getActiveTraining()};
    },

    finishTraining: function() {
        AppStateActionCreators.finishTraining();
        this.transitionTo('home');
    },

    startTraining: function() {
        AppStateActionCreators.startTraining();
    },

    render: function() {
        if(!this.state.activeTraining) {
            var handlers = {
                default: this.startTraining
            };
            return (
                <div className='page training'>
                    <h1>Select a Workout:</h1>
                    <List editAble={false} handlers={handlers} items={WorkoutStore.getWorkouts()}></List>
                </div>
            );
        }

        return (
            <div className='page training'>
                <h1>Training</h1>
                <div onClick={this.finishTraining}>Finish Training</div>
            </div>
        );
    },

    componentDidMount: function() {
        var self = this;
        AppState.addChangeListener(self._onChange);
        HeaderStateActionCreators.setConfig({
            back: true,
            title:  {
                visible: true,
                text: 'Training'
            }
        });
    },

    componentWillUnmount: function() {
        AppState.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({activeTraining: !!AppState.getActiveTraining()});
    }
});

module.exports = Training;

