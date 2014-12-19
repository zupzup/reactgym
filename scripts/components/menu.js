'use strict';

var React = require('react'),
    MenuButton = require('../components/menubutton'),
    { Navigation } = require('react-router');

var Menu = React.createClass({
    mixins: [Navigation],

    getInitialState() {
        return {
            menuPoints: [
                {
                    name: 'Home',
                    link: 'home'
                },
                {
                    name: 'Exercises',
                    link: 'exercises'
                },
                {
                    name: 'Workouts',
                    link: 'exercises'
                }
            ]
        };
    },

    render() {
        var self = this,
            menuPoints = this.state.menuPoints.map(function(item) {
            var handlerFunc = function() {
                self.transitionTo(item.link);
            };
            return <MenuButton name={item.name} handler={handlerFunc}></MenuButton>;
        });

        return (
            <div className='Menu'>
                {menuPoints}
            </div>
        );
    }
});

module.exports = Menu;

