'use strict';

var React = require('react'),
    List = require('../components/List'),
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    WorkoutStoreActionCreators = require('../actions/WorkoutStoreActionCreators'),
    WorkoutForm = require('../components/forms/WorkoutForm'),
    ExerciseStore = require('../stores/ExerciseStore.js'),
    WorkoutStore = require('../stores/WorkoutStore'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    HeaderMixin = require('../mixins/HeaderMixin'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var Workouts = React.createClass({
    header: {
        title: 'Workouts',
        add: () => {
            AppStateActionCreators.openModal(
                <WorkoutForm />
            );
        },
        edit: function() {
            this.setState({editAble: !this.state.editAble});
        }
    },

    mixins: [HeaderMixin, PureRenderMixin],

    getInitialState() {
        return {
            workouts: WorkoutStore.getWorkouts(),
            editAble: false
        };
    },

    deleteHandler(e, item, index) {
        WorkoutStoreActionCreators.removeWorkout(index);
    },

    editHandler(e, item, index) {
        AppStateActionCreators.openModal(
            <WorkoutForm edit={true} workout={item} />
        );
    },

    defaultHandler(e, item, index) {
        var exercises = item.exercises.map((i) => {
            var exercise = ExerciseStore.getExerciseForId(i);
            if(exercise) {
                return <div key={i}>{exercise.get('label')}</div>;
            }
        });
        AppStateActionCreators.openModal(
            <div className='workoutDetail'>
                <h1>{item.label}</h1>
                <strong>Exercises:</strong>
                {exercises}
            </div>
        );
    },

    render() {
        var handlers = {
            default: this.defaultHandler,
            delete: this.deleteHandler,
            edit: this.editHandler
        };
        return (
            <div className='page workouts'>
                <List editAble={this.state.editAble} handlers={handlers} items={this.state.workouts.toJS()}></List>
            </div>
        );
    },

    componentDidMount() {
        var self = this;
        WorkoutStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        WorkoutStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({workouts: WorkoutStore.getWorkouts()});
    }
});

module.exports = Workouts;

