'use strict';

var React = require('react'),
    WorkoutStoreActionCreators = require('../../actions/WorkoutStoreActionCreators'),
    ExerciseStore = require('../../stores/ExerciseStore'),
    AppStateActionCreators = require('../../actions/AppStateActionCreators');

var WorkoutForm = React.createClass({
    mixins: [],

    getInitialState() {
        return {
            exercises: ExerciseStore.getExercises()
        };
    },

    handleSubmit() {
        var workout = {
            label: this.refs.name.getDOMNode().value,
            exercises: this.getSelectedExercises(this.refs.exercises.getDOMNode().options)
        }
        if(this.props.edit) {
            workout.id = this.props.workout.id;
            WorkoutStoreActionCreators.updateWorkout(workout);
        } else {
            WorkoutStoreActionCreators.addWorkout(workout);
        }
        AppStateActionCreators.closeModal();
    },

    handleCancel() {
        AppStateActionCreators.closeModal();
    },

    render() {
        var self = this;
        var exercises = this.state.exercises.map((item) => {
            return <option value={item.id}>{item.label}</option>;
        });
        var value = this.props.edit ? this.props.workout.label : '';
       return (
            <div className='form workouts'>
                <h1>Workout</h1>
                <input className='nameField' type='text' placeholder='name' ref='name' defaultValue={value} />
                <select multiple ref='exercises' defaultValue={this.props.edit ? this.props.workout.exercises : []}>
                    {exercises}
                </select>
                <button onClick={this.handleSubmit}>Submit</button> |
                <button onClick={this.handleCancel}>Cancel</button>
            </div>
        );
    },

    getSelectedExercises(options) {
        return Array.prototype.filter.apply(options, [(option) => {
            return option.selected; 
        }]).map(function(option) {
            return option.value;
        });
    }
});

module.exports = WorkoutForm;

