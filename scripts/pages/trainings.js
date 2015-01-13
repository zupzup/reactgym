'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    Router = require('react-router');

var Trainings = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {
        };
    },


    render: function() {
        return (
            <div className='page training'>
                Training
            </div>
        );
    },

    componentDidMount: function() {
        var self = this;
        WorkoutStore.addChangeListener(this._onChange);
        HeaderStateActionCreators.setConfig({
            back: true,
            title:  {
                visible: true,
                text: 'Training'
            }
        });
    },

    componentWillUnmount: function() {
    },

    _onChange: function() {
    }
});

module.exports = Trainings;

