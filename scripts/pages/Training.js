'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    TrainingStoreActionCreators = require('../actions/TrainingStoreActionCreators'),
    WorkoutStore = require('../stores/WorkoutStore'),
    TrainingStore = require('../stores/TrainingStore'),
    ExerciseStore = require('../stores/ExerciseStore'),
    AppState = require('../stores/AppState');

var Training = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function() {
        return {activeTraining: AppState.getActiveTraining()};
    },

    finishTraining: function() {
        AppStateActionCreators.finishTraining();
        this.transitionTo('home');
    },

    startTraining: function(e, item, index) {
        var training = {
            workout: item,
            id: TrainingStore.getTrainings().map(function(item) {
                return item.id + 1;
            }).reduce(function(acc, item) {
                return item;
            }, 0)
        };
        TrainingStoreActionCreators.addTraining(training);
        AppStateActionCreators.startTraining(training.id);
    },

    exerciseClickHandler: function(e, item, index) {
        console.log(item);
    },

    render: function() {
        if(this.state.activeTraining === null) {
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

        var handlers = {
                default: this.exerciseClickHandler
            },
            training = TrainingStore.getTrainingForId(this.state.activeTraining);
        if(training != null) {
            exercises = ExerciseStore.getExercises().filter(function(item) {
                return training.workout.exercises.indexOf(item.id) !== -1;
            });
            return (
                <div className='page training'>
                    <h1>Training</h1>
                    <h2>{training.workout.label}</h2>
                    <List editAble={false} handlers={handlers} items={exercises}></List>
                    <div onClick={this.finishTraining}>Finish Training</div>
                </div>
            );
        }
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
        this.setState({activeTraining: AppState.getActiveTraining()});
    }
});

module.exports = Training;

