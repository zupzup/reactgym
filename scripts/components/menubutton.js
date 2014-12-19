
'use strict';

var React = require('react');

var MenuButton = React.createClass({
    render() {
        return (
            <span className='menubutton' onClick={this.props.handler}>
                {this.props.name}
            </span>
        );
    }
});

module.exports = MenuButton;

