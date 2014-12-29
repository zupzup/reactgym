'use strict';

var React = require('react'),
    List = require('../components/List')
    Router = require('react-router');

var Workouts = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {
            workouts: [
                {
                    label: 'Abs Shoulder Chest Triceps',
                    exercises: [1, 2]
                },
                {
                    label: 'Legs Back Biceps',
                    exercises: [1, 2]
                }
            ]
        };
    },

    render: function() {
        var defaultHandler = function(item, index) {
            console.log(item, index);
        };

        return (
            <div className='page workouts'>
                <List defaultHandler={defaultHandler} items={this.state.workouts}></List>
            </div>
        );
    }
});

module.exports = Workouts;

