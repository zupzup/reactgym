'use strict';

var React = require('react'),
    Router = require('react-router');

var Workouts = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {
            workouts: [
                {
                    name: 'Abs Shoulder Chest Triceps',
                    exercises: [1, 2]
                },
                {
                    name: 'Legs Back Biceps',
                    exercises: [1, 2]
                }
            ]
        };
    },

    render: function() {
        var workouts = this.state.workouts.map(function(item) {
            return <p>{item.name}</p>;
        });

        return (
            <div className='workouts'>
                {workouts}
            </div>
        );
    }
});

module.exports = Workouts;

