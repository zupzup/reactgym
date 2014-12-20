'use strict';

var React = require('react'),
    Menu = require('../components/menu'),
    { Navigation } = require('react-router');

var Header = React.createClass({
    mixins: [Navigation],

    render() {
        return (
            <div className='header'>
                <span onClick={this.back}>back</span>
                <span onClick={this.props.menuHandler}>menu</span>
            </div>
        );
    },

    back() {
        if(history.state != null) {
            this.goBack();
        }
    }
});

module.exports = Header;

