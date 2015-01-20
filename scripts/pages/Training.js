'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    TrainingStoreActionCreators = require('../actions/TrainingStoreActionCreators'),
    WorkoutStore = require('../stores/WorkoutStore'),
    _ = require('lodash'),
    TrainingForm = require('../components/forms/TrainingForm'),
    Router = require('react-router'),
    StopTrainingDialog = require('../components/StopTrainingDialog'),
    TrainingStore = require('../stores/TrainingStore'),
    ExerciseStore = require('../stores/ExerciseStore'),
    AppState = require('../stores/AppState');

var Training = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function() {
        return {
            activeTraining: AppState.getActiveTraining(),
            timer: AppState.getTimer()
        };
    },

    finishTraining: function() {
        var yesHandler = function() {
            AppStateActionCreators.finishTraining();
            AppStateActionCreators.closeModal();
            this.transitionTo('home');
        };
        var noHandler = function() {
            AppStateActionCreators.closeModal();
        };
        AppStateActionCreators.openModal(
            <StopTrainingDialog yesHandler={yesHandler} noHandler={noHandler} />
        );
    },

    startTraining: function(e, item, index) {
        var workout = _.assign({}, item);
        var sets = workout.exercises.reduce(function(acc, exercise) {
            acc[exercise] = [];
            return acc;
        }, {});
        var training = {
            workout: workout,
            id: TrainingStore.getTrainings().map(function(item) {
                return item.id + 1;
            }).reduce(function(acc, item) {
                return item;
            }, 0),
            sets: sets,
            currentExercise: _.first(workout.exercises)
        };
        TrainingStoreActionCreators.addTraining(training);
        AppStateActionCreators.startTraining(training.id);
    },

    exerciseClickHandler: function(e, item, index) {
        AppStateActionCreators.setCurrentExercise(item.id);
    },

    formSubmitHandler: function(exercise, reps, weight) {
        AppStateActionCreators.addSet(exercise, reps, weight);
        AppStateActionCreators.startTimer();
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
            var exercises = ExerciseStore.getExercises().filter(function(item) {
                return training.workout.exercises.indexOf(item.id) !== -1;
            }),
            currentExercise = training.currentExercise;
            return (
                <div className='page training'>
                    <h1>{training.workout.label}</h1>
                    <div className='timer'>{this.state.timer}</div>
                    <List editAble={false} handlers={handlers} items={exercises}></List>
                    <TrainingForm exercise={currentExercise} sets={training.sets[currentExercise]} handler={this.formSubmitHandler} />
                    <div className='finish' onClick={this.finishTraining}>Finish Training</div>
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
        this.setState({
            activeTraining: AppState.getActiveTraining(),
            timer: AppState.getTimer()
        });
    }
});

module.exports = Training;

