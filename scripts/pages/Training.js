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

    getInitialState() {
        return {
            activeTraining: AppState.getActiveTraining(),
            timer: AppState.getTimer()
        };
    },

    finishTraining() {
        var self = this,
            yesHandler = () => {
                TrainingStoreActionCreators.addTraining(AppState.getActiveTraining());
                AppStateActionCreators.finishTraining();
                AppStateActionCreators.stopTimer();
                AppStateActionCreators.closeModal();
                self.transitionTo('home');
            },
            noHandler = () => {
                AppStateActionCreators.closeModal();
            };
        AppStateActionCreators.openModal(
            <StopTrainingDialog yesHandler={yesHandler} noHandler={noHandler} />
        );
    },

    startTraining(e, item, index) {
        var workout = _.assign({}, item);
        var sets = workout.exercises.reduce((acc, exercise) => {
            acc[exercise] = [];
            return acc;
        }, {});
        var training = {
            workout: workout,
            id: TrainingStore.getTrainings().map((item) => {
                return item.id + 1;
            }).reduce((acc, item) => {
                return item;
            }, 0),
            sets: sets,
            currentExercise: _.first(workout.exercises)
        };
        AppStateActionCreators.startTraining(training);
    },

    exerciseClickHandler(e, item, index) {
        AppStateActionCreators.setCurrentExercise(item.id);
    },

    formSubmitHandler(exercise, reps, weight) {
        AppStateActionCreators.addSet(exercise, reps, weight);
        AppStateActionCreators.startTimer();
    },

    render() {
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
            training = this.state.activeTraining;

        if(training != null) {
            var exercises = ExerciseStore.getExercises().filter((item) => {
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

    componentDidMount() {
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

    componentWillUnmount() {
        AppState.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({
            activeTraining: AppState.getActiveTraining(),
            timer: AppState.getTimer()
        });
    }
});

module.exports = Training;

