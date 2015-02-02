'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    Router = require('react-router'),
    AppState = require('../stores/AppState');

var Home = React.createClass({
    mixins: [Router.Navigation],

    getInitialState() {
        return {
            timer: AppState.getTimer()
        };
    },

    goToTrainingHandler() {
        this.transitionTo('training');
    },

    render() {
        var activeTraining = AppState.getActiveTraining(),
            trainingDiv;
        if(activeTraining) {
            trainingDiv = <div onClick={this.goToTrainingHandler} className='activeTraining'>{activeTraining.workout.label}</div>;
        }
        return (
            <div className='page home'>
                {trainingDiv}
                <div className='timer'>{this.state.timer}</div>
            </div>
        );
    },

    componentWillMount() {
        HeaderStateActionCreators.setConfig({
            back: false,
            title:  {
                visible: true,
                text: 'Home'
            }
        });
    },

    componentDidMount() {
        var self = this;
        AppState.addChangeListener(self._onChange);
    },

    componentWillUnmount() {
        AppState.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({
            timer: AppState.getTimer()
        });
    }
});

module.exports = Home;

