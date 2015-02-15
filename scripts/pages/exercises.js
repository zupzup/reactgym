'use strict';

var React = require('react'),
    List = require('../components/List'),
    ExerciseStoreActionCreators = require('../actions/ExerciseStoreActionCreators'),
    WorkoutStoreActionCreators = require('../actions/WorkoutStoreActionCreators'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    AddExercise = require('../components/forms/AddExercise'),
    HeaderMixin = require('../mixins/HeaderMixin'),
    Immutable = require('immutable'),
    PureRenderMixin = require('react').addons.PureRenderMixin,
    ExerciseStore = require('../stores/ExerciseStore');

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

    mixins: [HeaderMixin, PureRenderMixin],

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

    editHandler(e, item, index) {
        AppStateActionCreators.openModal(
            <AddExercise edit={true} exercise={item} />
        );
    },

    render() {
        var handlers = {
            default: null,
            delete: this.deleteHandler,
            edit: this.editHandler
        };
        return (
            <div className='page exercises'>
                <List editAble={this.state.editAble} handlers={handlers} items={this.state.exercises.toJS()}></List>
            </div>
        );
    },

    componentDidMount() {
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

