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

    getInitialState() {
        return {
            exercises: ExerciseStore.getExercises(),
            editAble: false
        };
    },

    deleteHandler(e, item, index) {
        ExerciseStoreActionCreators.removeExercise(index);
    },

    defaultHandler(e, item, index) {
        console.log(item, index);
    },

    render() {
        var handlers = {
            default: this.defaultHandler,
            delete: this.deleteHandler
        }
        return (
            <div className='page exercises'>
                <List editAble={this.state.editAble} handlers={handlers} items={this.state.exercises}></List>
            </div>
        );
    },

    componentDidMount() {
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
                handler: () => {
                    AppStateActionCreators.openModal(
                        <AddExercise />
                    );
                }
            },
            editMode: {
                visible: true,
                handler: () => {
                    self.setState({editAble: !self.state.editAble})
                }
            }
        });
    },

    componentWillUnmount() {
        ExerciseStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({exercises: ExerciseStore.getExercises()});
    }
});

module.exports = Exercises;

