'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    AppState = require('../stores/AppState'),
    Router = require('react-router');

var Home = React.createClass({
    mixins: [Router.State],

    getInitialState() {
        return {
            timer: AppState.getTimer()
        };
    },

    render() {
        return (
            <div className='page home'>
                Ello!
                <div>{this.state.timer}</div>
            </div>
        );
    },

    componentWillMount() {
        HeaderStateActionCreators.setConfig({
            back: false,
            title:  {
                visible: true,
                text: 'Home'
            }
        });
    },

    componentDidMount() {
        var self = this;
        AppState.addChangeListener(self._onChange);
    },

    componentWillUnmount() {
        AppState.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({
            timer: AppState.getTimer()
        });
    }
});

module.exports = Home;

