'use strict';

var React = require('react'),
    Menu = require('../components/menu');

var Header = React.createClass({

    render() {
        var showBack = history.state != null ? '' : 'hide';
        return (
            <div className='header'>
                <span className={"back " + showBack} onClick={this.props.backHandler}>back</span>
                <span onClick={this.props.menuHandler}>menu</span>
            </div>
        );
    }
});

module.exports = Header;

