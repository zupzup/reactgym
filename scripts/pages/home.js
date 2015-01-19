'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    AppState = require('../stores/AppState'),
    Router = require('react-router');

var Home = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {
            timer: AppState.getTimer()
        };
    },

    render: function() {
        return (
            <div className='page home'>
                Ello!
                <div>{this.state.timer}</div>
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

    componentDidMount: function() {
        var self = this;
        AppState.addChangeListener(self._onChange);
    },

    componentWillUnmount: function() {
        AppState.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({
            timer: AppState.getTimer()
        });
    }
});

module.exports = Home;

