'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    TrainingStore = require('../stores/TrainingStore.js'),
    Router = require('react-router'),
    Immutable = require('immutable'),
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
            trainingDiv,
            trainings = TrainingStore.getTrainings().map((item) => {
                var date = new Date(item.date);
                item.label = date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ' - ' + item.workout.label;
                return item;
            }),
            timerDiv;

        if(activeTraining) {
            trainingDiv = <div onClick={this.goToTrainingHandler} className='activeTraining'>{activeTraining.workout.label}</div>;
            timerDiv = <div className='timer'>{this.state.timer}</div>;
        }
        return (
            <div className='page home'>
                {trainingDiv}
                {timerDiv}
                <h2>Recent Trainings:</h2>
                <List editAble={false} items={trainings}></List>
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

