'use strict';

var React = require('react'),
    Router = require('react-router');

var Exercises = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {
            exercises: [
                {
                    id: 1,
                    name: 'T-Bar-Rows'
                },
                {
                    id: 2,
                    name: 'Hammercurls'
                }
            ]
        };
    },

    render: function() {
        var exercises = this.state.exercises.map(function(item) {
            return <p>{item.name}</p>;
        });

        return (
            <div className='exercises'>
                {exercises}
            </div>
        );
    }
});

module.exports = Exercises;

