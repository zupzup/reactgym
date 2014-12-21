'use strict';

var React = require('react'),
    Router = require('react-router'),
    Menu = require('../components/menu');

var Header = React.createClass({
    mixins: [Router.State],

    render() {
        var currentRoute = this.getRoutes().reverse()[0].name,
            showBack = (history.state == null || currentRoute === 'home') ? 'hide' : ''; //TODO: move to store
        return (
            <div className='header'>
                <span className={"back " + showBack} onClick={this.props.backHandler}>back</span>
                <span onClick={this.props.menuHandler}>menu</span>
            </div>
        );
    }
});

module.exports = Header;

