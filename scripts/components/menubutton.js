
'use strict';

var React = require('react');

var MenuButton = React.createClass({
    render() {
        return (
            <div className='menubutton' onClick={this.props.handler}>
                {this.props.name}
            </div>
        );
    }
});

module.exports = MenuButton;

