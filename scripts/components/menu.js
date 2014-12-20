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
            open = this.props.open ? 'open' : 'closed',
            menuPoints = this.props.items.map(function(item) {
            var handlerFunc = function() {
                self.transitionTo(item.link);
            };
            return <MenuButton name={item.name} handler={handlerFunc}></MenuButton>;
        });

        return (
            <div className={"menu " + open}>
                {menuPoints}
            </div>
        );
    }
});

module.exports = Menu;

