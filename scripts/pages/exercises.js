'use strict';

let React = require('react'),
    List = require('../components/List'),
    ExerciseStoreActionCreators = require('../actions/ExerciseStoreActionCreators'),
    WorkoutStoreActionCreators = require('../actions/WorkoutStoreActionCreators'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    AddExercise = require('../components/forms/AddExercise'),
    HeaderMixin = require('../mixins/HeaderMixin'),
    ExerciseStore = require('../stores/ExerciseStore');

let Exercises = React.createClass({
    header: {
        title: 'Exercises',
        add: () => {
            AppStateActionCreators.openModal(
                <AddExercise />
            );
        },
        edit: function() {
            this.setState({editAble: !this.state.editAble});
        }
    },

    mixins: [HeaderMixin, React.addons.PureRenderMixin],

    getInitialState() {
        return {
            exercises: ExerciseStore.getExercises(),
            editAble: false
        };
    },

    deleteHandler(e, item, index) {
        ExerciseStoreActionCreators.removeExercise(index);
        AppStateActionCreators.finishTraining();
        WorkoutStoreActionCreators.removeExerciseFromWorkouts(item.id);
    },

    editHandler(e, item) {
        AppStateActionCreators.openModal(
            <AddExercise edit={true} exercise={item} />
        );
    },

    render() {
        let handlers = {
            default: null,
            delete: this.deleteHandler,
            edit: this.editHandler
        };
        return (
            <div className='page exercises'>
                <List editAble={this.state.editAble} handlers={handlers} items={this.state.exercises.toJS()} />
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

