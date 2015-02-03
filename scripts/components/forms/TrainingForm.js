'use strict';

var React = require('react/addons'),
    AppStateActionCreators = require('../../actions/AppStateActionCreators'),
    ExerciseStore = require('../../stores/ExerciseStore');

var TrainingForm = React.createClass({

    getInitialState() {
        return {};
    },

    handleSubmit() {
        var reps = this.refs.reps.getDOMNode(),
            weight = this.refs.weight.getDOMNode();
        this.props.handler(this.props.exercise, reps.value, weight.value);
        reps.value = '';
        weight.value = '';
    },

    render() {
        var self = this,
            exercise = ExerciseStore.getExerciseForId(this.props.exercise),
            sets = this.props.sets.map((item, index) => {
                var handler = () => {
                    AppStateActionCreators.removeSet(self.props.exercise, index);
                }
                return <span className='rep' key={index} onClick={handler}>{index + 1}</span>;
            });
       return (
            <div className='form training'>
                <div>{sets}</div>
                <h1>{exercise.label}</h1>
                <div>
                    <span>
                        <input className='reps' type='text' placeholder='reps' ref='reps' /><br />
                        <input className='reps' type='text' placeholder='weight' ref='weight' /><br />
                    </span>
                    <span>
                        <button className='submitButton' onClick={this.handleSubmit}>Add</button> 
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = TrainingForm;

