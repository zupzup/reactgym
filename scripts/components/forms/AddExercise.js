'use strict';

var React = require('react'),
    AppStateActionCreators = require('../../actions/AppStateActionCreators');

var AddExercise = React.createClass({
    mixins: [],

    getInitialState: function() {
        return {};
    },

    handleSubmit: function() {
        AppStateActionCreators.closeModal();
    },

    handleCancel: function() {
        AppStateActionCreators.closeModal();
    },

    render: function() {

       return (
            <div className='form exercises'>
                <h1>Add Exercise</h1>
                <input className='nameField' type='text' placeholder='name' name={name} />
                <button onClick={this.handleSubmit}>Submit</button> |
                <button onClick={this.handleCancel}>Cancel</button>
            </div>
        );
    },
});

module.exports = AddExercise;

