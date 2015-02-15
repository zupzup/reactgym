'use strict';

var React = require('react'),
    List = require('../components/List'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    SimpleHeaderMixin = require('../mixins/SimpleHeaderMixin'),
    TrainingStoreActionCreators = require('../actions/TrainingStoreActionCreators'),
    WorkoutStore = require('../stores/WorkoutStore'),
    _ = require('lodash'),
    TrainingForm = require('../components/forms/TrainingForm'),
    Router = require('react-router'),
    PureRenderMixin = require('react').addons.PureRenderMixin,
    Immutable = require('immutable'),
    StopTrainingDialog = require('../components/StopTrainingDialog'),
    TrainingStore = require('../stores/TrainingStore'),
    ExerciseStore = require('../stores/ExerciseStore'),
    AppState = require('../stores/AppState');

var Training = React.createClass({
    header: {
        title: 'Training'
    },
    mixins: [Router.Navigation, SimpleHeaderMixin, PureRenderMixin],

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
            id: TrainingStore.getTrainings().reduce((acc, item) => {
                return item.get('id');
            }, 0) + 1,
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
        var handlers = {};
        if(this.state.activeTraining === null) {
            handlers = {
                default: this.startTraining
            };
            return (
                <div className='page training'>
                    <h1>Select a Workout:</h1>
                    <List editAble={false} handlers={handlers} items={WorkoutStore.getWorkouts().toJS()}></List>
                </div>
            );
        }

        handlers = {
            default: this.exerciseClickHandler
        };
        var training = this.state.activeTraining,
            exercises = ExerciseStore.getExercises().filter((item) => {
                return training.getIn(['workout', 'exercises']).contains(item.get('id'));
            }),
            currentExercise = training.get('currentExercise').toString(),
            currentExerciseIndex = exercises.findIndex((item, index) => {
                return item.get('id') == currentExercise;
            });

        return (
            <div className='page training'>
                <h1>{training.getIn(['workout', 'label'])}</h1>
                <div className='timer'>
                    {this.state.timer}<img src='styles/images/android-timer.png' />
                </div>
                <List activeIndex={currentExerciseIndex} editAble={false} handlers={handlers} items={exercises.toJS()}></List>
                <TrainingForm exercise={currentExercise} sets={training.getIn(['sets', currentExercise])} handler={this.formSubmitHandler} />
                <div className='finish' onClick={this.finishTraining}>
                    <img src='styles/images/trophy.png' />Finish Training
                </div>
            </div>
        );
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
            activeTraining: AppState.getActiveTraining(),
            timer: AppState.getTimer()
        });
    }
});

module.exports = Training;

