'use strict';

var React = require('react'),
    Router = require('react-router');

var Exercises = React.createClass({
    mixins: [Router.State],

    getInitialState() {
        return {
            exercises: [
                {
                    name: 'T-Bar-Rows'
                },
                {
                    name: 'Hammercurls'
                }
            ]
        };
    },

    render() {
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

