'use strict';

var React = require('react'),
    Router = require('react-router'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    Menu = require('../components/Menu');

var Header = React.createClass({
    mixins: [Router.State],

    render() {
        var currentRoute = this.getRoutes().reverse()[0].name,
            showBack = (history.state == null || currentRoute === 'home') ? 'hide' : '';
        return (
            <div className='header'>
                <span className={"back " + showBack} onClick={this.props.backHandler}>back</span>
                <span onClick={AppStateActionCreators.toggleMenu}>menu</span>
            </div>
        );
    }
});

module.exports = Header;

