'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
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
    },

    componentWillMount: function() {
        HeaderStateActionCreators.setConfig({
            back: true,
            title:  {
                visible: true,
                text: 'Exercises'
            },
            add: {
                visible: true,
                handler: function() {
                    AppStateActionCreators.openModal(<div>Hello Modal!</div>);
                }
            },
            editMode: {
                visible: true,
                handler: function() {
                    AppStateActionCreators.closeModal();
                }
            }
        });
    },

    componentWillUnmount: function() {
        HeaderStateActionCreators.resetConfig();
    }
});

module.exports = Exercises;

