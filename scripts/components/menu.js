'use strict';

var React = require('react'),
    MenuButton = require('../components/menubutton'),
    { Navigation } = require('react-router');

var Menu = React.createClass({
    mixins: [Navigation],

    getInitialState() {
        return {};
    },

    render() {
        var self = this,
            menuPoints = this.props.items.map(function(item) {
            var handlerFunc = function() {
                self.props.closeHandler();
                self.transitionTo(item.link);
            };
            return <MenuButton name={item.name} handler={handlerFunc}></MenuButton>;
        });

        return (
            <div className="menu">
                {menuPoints}
            </div>
        );
    }
});

module.exports = Menu;

