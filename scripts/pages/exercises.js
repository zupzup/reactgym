'use strict';

import React from 'react';
import List from '../components/List';
import ExerciseStoreActionCreators from '../actions/ExerciseStoreActionCreators';
import WorkoutStoreActionCreators from '../actions/WorkoutStoreActionCreators';
import AppStateActionCreators from '../actions/AppStateActionCreators';
import AddExercise from '../components/forms/AddExercise';
import HeaderMixin from '../mixins/HeaderMixin';
import ExerciseStore from '../stores/ExerciseStore';

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
