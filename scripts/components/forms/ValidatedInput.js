'use strict';

let React = require('react/addons'),
ValidationUtil = require('../../utils/ValidationUtil'),
PureRenderMixin = require('react').addons.PureRenderMixin;

let ValidatedInput = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            value: this.props.value || '',
            valid: null
        };
    },

    validate(value) {
        let validator = ValidationUtil.getValidationFunction(this.props.validator);
        return validator.test(value);
    },

    reset() {
        this.validateAndSetValue('');
    },

    setValue(value) {
        this.validateAndSetValue(value);
    },

    componentWillReceiveProps(next) {
        this.validateAndSetValue(next.value);
    },

    componentDidMount() {
        let value = this.props.value || '';
        this.validateAndSetValue(value);
    },

    validateAndSetValue(value) {
        let valid = 'valid';
        if(!this.validate(value)) {
            valid = 'invalid';
        }
        this.setState({
            value,
            valid
        });
    },

    scrollToMe() {
        let node = this.getDOMNode();
        node.scrollTop = node.scrollHeight;
    },

    changeHandler(e) {
        let newValue = e.currentTarget.value;
        this.validateAndSetValue(newValue);
    },

    render() {
        return (
            <input onFocus={this.scrollToMe} placeholder={this.props.placeholder} ref={this.props.ref} className={this.props.className + ' ' + this.state.valid} type={this.props.type || 'text'} name={this.props.name} onChange={this.props.changeHandler || this.changeHandler} value={this.state.value} />
        );
    }
});

module.exports = ValidatedInput;

