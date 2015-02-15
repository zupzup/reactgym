'use strict';

var React = require('react/addons'),
    WorkoutStoreActionCreators = require('../../actions/WorkoutStoreActionCreators'),
    ExerciseStore = require('../../stores/ExerciseStore'),
    ValidatedInput = require('./ValidatedInput'),
    AppStateActionCreators = require('../../actions/AppStateActionCreators'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var WorkoutForm = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            exercises: ExerciseStore.getExercises()
        };
    },

    handleSubmit() {
        var workout = {
            label: this.refs.name.getDOMNode().value,
            exercises: this.getSelectedExercises(this.refs.exercises.getDOMNode().options)
        };
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
        var self = this,
            exercises = this.state.exercises.map((item) => {
                return <option key={item.get('id')} value={item.get('id')}>{item.get('label')}</option>;
            }),
            value = this.props.edit ? this.props.workout.label : '';
       return (
            <div className='form workouts'>
                <h1>Workout</h1>
                <div>
                    <ValidatedInput validator='string' ref='name' placeholder='name' className='nameField' value={value} />
                </div>
                <div>
                    <select multiple ref='exercises' defaultValue={this.props.edit ? this.props.workout.exercises : []}>
                        {exercises}
                    </select>
                </div>
                <div>
                    <button className='submitButton' onClick={this.handleSubmit}>Submit</button>
                    <button className='cancelButton' onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    },

    getSelectedExercises(options) {
        return Array.prototype.filter.apply(options, [(option) => {
            return option.selected; 
        }]).map((option) => {
            return option.value;
        });
    }
});

module.exports = WorkoutForm;

