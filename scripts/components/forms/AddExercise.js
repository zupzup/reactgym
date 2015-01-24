'use strict';

var React = require('react'),
    ValidatedInput = require('./ValidatedInput'),
    ExerciseStoreActionCreators = require('../../actions/ExerciseStoreActionCreators'),
    AppStateActionCreators = require('../../actions/AppStateActionCreators');

var AddExercise = React.createClass({
    mixins: [],

    getInitialState() {
        return {};
    },

    handleSubmit() {
        ExerciseStoreActionCreators.addExercise(this.refs.name.getDOMNode().value);
        AppStateActionCreators.closeModal();
    },

    handleCancel() {
        AppStateActionCreators.closeModal();
    },

    render() {

       return (
            <div className='form exercises'>
                <h1>Add Exercise</h1>
                <ValidatedInput validator='string' ref='name' placeholder='name' className='nameField' />
                <button onClick={this.handleSubmit}>Submit</button> |
                <button onClick={this.handleCancel}>Cancel</button>
            </div>
        );
    },
});

module.exports = AddExercise;

