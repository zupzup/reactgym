'use strict';

var React = require('react'),
    ValidationUtil = require('../../utils/ValidationUtil');

var ValidatedInput = React.createClass({
    mixins: [],

    getInitialState: function() {
        return {
            value: this.props.value || '',
            valid: null
        };
    },

    validate: function(value) {
        var validator = ValidationUtil.getValidationFunction(this.props.validator);
        return validator.test(value);
    },

    componentDidMount: function() {
        var value = this.props.value || '';
        this.validateAndSetValue(value);
    },

    validateAndSetValue: function(value) {
        var valid = 'valid';
        if(!this.validate(value)) {
            valid = 'invalid';
        }
        this.setState({
            value: value,
            valid: valid
        });
    },

    changeHandler: function(e) {
        var newValue = e.currentTarget.value;
        this.validateAndSetValue(newValue);
    },

    render: function() {
       return (
        <input placeholder={this.props.placeholder} ref={this.props.ref} className={this.props.className + ' ' + this.state.valid} type='text' name={this.props.name} onChange={this.changeHandler} value={this.state.value} />
        );
    },
});

module.exports = ValidatedInput;

