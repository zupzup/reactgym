'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    ExerciseStoreActionCreators = require('../actions/ExerciseStoreActionCreators'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    AddExercise = require('../components/forms/AddExercise'),
    ExerciseStore = require('../stores/ExerciseStore'),
    Router = require('react-router');

var Exercises = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {
            exercises: ExerciseStore.getExercises(),
            editAble: false
        };
    },

    deleteHandler: function(e, item, index) {
        ExerciseStoreActionCreators.removeExercise(index);
    },

    defaultHandler: function(e, item, index) {
        console.log(item, index);
    },

    render: function() {
        return (
            <div className='page exercises'>
                <List deleteHandler={this.deleteHandler} editAble={this.state.editAble} defaultHandler={this.defaultHandler} items={this.state.exercises}></List>
            </div>
        );
    },

    componentDidMount: function() {
        var self = this;
        ExerciseStore.addChangeListener(this._onChange);
        HeaderStateActionCreators.setConfig({
            back: true,
            title:  {
                visible: true,
                text: 'Exercises'
            },
            add: {
                visible: true,
                handler: function() {
                    AppStateActionCreators.openModal(
                        <AddExercise /> 
                    );
                }
            },
            editMode: {
                visible: true,
                handler: function() {
                    self.setState({editAble: !self.state.editAble})
                }
            }
        });
    },

    componentWillUnmount: function() {
        ExerciseStore.removeChangeListener(this._onChange);
        HeaderStateActionCreators.resetConfig();
    },

    _onChange: function() {
        this.setState({exercises: ExerciseStore.getExercises()});
    }
});

module.exports = Exercises;

