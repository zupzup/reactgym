'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    Router = require('react-router');

var Home = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {};
    },

    render: function() {
        return (
            <div className='page home'>
                Ello!
            </div>
        );
    },

    componentWillMount: function() {
        HeaderStateActionCreators.setConfig({
            back: false,
            title:  {
                visible: true,
                text: 'Home'
            }
        });
    },

    componentWillUnmount: function() {
        HeaderStateActionCreators.resetConfig();
    }
});

module.exports = Home;

