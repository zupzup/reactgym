'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    ExerciseStoreActionCreators = require('../actions/ExerciseStoreActionCreators'),
    WorkoutStoreActionCreators = require('../actions/WorkoutStoreActionCreators'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    AddExercise = require('../components/forms/AddExercise'),
    HeaderMixin = require('../mixins/HeaderMixin');
    ExerciseStore = require('../stores/ExerciseStore'),
    Router = require('react-router');

var Exercises = React.createClass({
    header: {
        title: 'Exercises',
        add: () => {
            AppStateActionCreators.openModal(
                <AddExercise />
            );
        },
        edit: function() {
            this.setState({editAble: !this.state.editAble})
        }
    },

    mixins: [Router.State, HeaderMixin],

    getInitialState() {
        return {
            exercises: ExerciseStore.getExercises(),
            editAble: false
        };
    },

    deleteHandler(e, item, index) {
        ExerciseStoreActionCreators.removeExercise(index);
        WorkoutStoreActionCreators.removeExerciseFromWorkouts(item.id);
    },

    defaultHandler(e, item, index) {
        console.log(item, index);
    },

    render() {
        var handlers = {
            default: this.defaultHandler,
            delete: this.deleteHandler
        }
        return (
            <div className='page exercises'>
                <List editAble={this.state.editAble} handlers={handlers} items={this.state.exercises}></List>
            </div>
        );
    },

    componentDidMount() {
        var self = this;
        ExerciseStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        ExerciseStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({exercises: ExerciseStore.getExercises()});
    }
});

module.exports = Exercises;

