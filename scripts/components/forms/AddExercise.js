'use strict';

var React = require('react/addons'),
    ValidatedInput = require('./ValidatedInput'),
    ExerciseStoreActionCreators = require('../../actions/ExerciseStoreActionCreators'),
    AppStateActionCreators = require('../../actions/AppStateActionCreators'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var AddExercise = React.createClass({
    mixins: [PureRenderMixin],

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
                <button className='submitButton' onClick={this.handleSubmit}>Submit</button> |
                <button className='cancelButton' onClick={this.handleCancel}>Cancel</button>
            </div>
        );
    },
});

module.exports = AddExercise;

