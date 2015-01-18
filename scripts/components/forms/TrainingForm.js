'use strict';

var React = require('react'),
    ExerciseStore = require('../../stores/ExerciseStore');

var TrainingForm = React.createClass({
    mixins: [],

    getInitialState: function() {
        return {};
    },

    handleSubmit: function() {
        var reps = this.refs.reps.getDOMNode(),
            weight = this.refs.weight.getDOMNode();
        this.props.handler(this.props.exercise, reps.value, weight.value);
        reps.value = '';
        weight.value = '';
    },

    render: function() {
        var exercise = ExerciseStore.getExerciseForId(this.props.exercise),
            sets = this.props.sets.map(function(item, index) {
                return <span key={index}>{index + 1}</span>;
            });
       return (
            <div className='form training'>
                <div>{sets}</div>
                <h1>{exercise.label}</h1>
                <input className='reps' type='text' placeholder='reps' ref='reps' />
                <input className='reps' type='text' placeholder='weight' ref='weight' />
                <button onClick={this.handleSubmit}>Submit</button> 
            </div>
        );
    }
});

module.exports = TrainingForm;

