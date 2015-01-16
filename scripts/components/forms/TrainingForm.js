'use strict';

var React = require('react'),
    TrainingStore = require('../../stores/TrainingStore'),
    AppStateActionCreators = require('../../actions/AppStateActionCreators');

var TrainingForm = React.createClass({
    mixins: [],

    getInitialState: function() {
        return {};
    },

    handleSubmit: function() {
        console.log('submit clicked');
    },

    render: function() {
        var exercise = this.props.exercise;

       return (
            <div className='form training'>
                <h1>exercise.label</h1>
                <input className='reps' type='text' placeholder='reps' ref='reps' />
                <input className='reps' type='text' placeholder='weight' ref='weight' />
                <button onClick={this.handleSubmit}>Submit</button> |
            </div>
        );
    }
});

module.exports = TrainingForm;

