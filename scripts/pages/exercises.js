'use strict';

var React = require('react'),
    List = require('../components/List')
    Router = require('react-router');

var Exercises = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {
            exercises: [
                {
                    id: 1,
                    label: 'T-Bar-Rows'
                },
                {
                    id: 2,
                    label: 'Hammercurls'
                }
            ]
        };
    },

    render: function() {
        var defaultHandler = function(item, index) {
            console.log(item, index);
        };
        return (
            <div className='page exercises'>
                <List defaultHandler={defaultHandler} items={this.state.exercises}></List>
            </div>
        );
    }
});

module.exports = Exercises;

