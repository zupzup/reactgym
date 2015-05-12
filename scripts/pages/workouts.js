'use strict';

let React = require('react'),
    List = require('../components/List'),
    WorkoutStoreActionCreators = require('../actions/WorkoutStoreActionCreators'),
    WorkoutForm = require('../components/forms/WorkoutForm'),
    ExerciseStore = require('../stores/ExerciseStore.js'),
    WorkoutStore = require('../stores/WorkoutStore'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    HeaderMixin = require('../mixins/HeaderMixin');

let Workouts = React.createClass({
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

    mixins: [HeaderMixin, React.addons.PureRenderMixin],

    getInitialState() {
        return {
            workouts: WorkoutStore.getWorkouts(),
            editAble: false
        };
    },

    deleteHandler(e, item, index) {
        AppStateActionCreators.finishTraining();
        WorkoutStoreActionCreators.removeWorkout(index);
    },

    editHandler(e, item) {
        AppStateActionCreators.openModal(
            <WorkoutForm edit={true} workout={item} />
        );
    },

    defaultHandler(e, item) {
        let exercises = item.exercises.map((i) => {
            let exercise = ExerciseStore.getExerciseForId(i);
            if (exercise) {
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
        let handlers = {
            default: this.defaultHandler,
            delete: this.deleteHandler,
            edit: this.editHandler
        };
        return (
            <div className='page workouts'>
                <List editAble={this.state.editAble} handlers={handlers} items={this.state.workouts.toJS()} />
            </div>
        );
    },

    componentDidMount() {
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

