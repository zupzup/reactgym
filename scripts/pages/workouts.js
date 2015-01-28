'use strict';

var React = require('react'),
    List = require('../components/List')
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    WorkoutStoreActionCreators = require('../actions/WorkoutStoreActionCreators'),
    WorkoutForm = require('../components/forms/WorkoutForm'),
    WorkoutStore = require('../stores/WorkoutStore'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    HeaderMixin = require('../mixins/HeaderMixin');
    Router = require('react-router');

var Workouts = React.createClass({
    header: {
        title: 'Workouts',
        add: () => {
            AppStateActionCreators.openModal(
                <WorkoutForm />
            );
        },
        edit: function() {
            this.setState({editAble: !this.state.editAble})
        }
    },

    mixins: [Router.State, HeaderMixin],

    getInitialState() {
        return {
            workouts: WorkoutStore.getWorkouts(),
            editAble: false
        };
    },

    deleteHandler(e, item, index) {
        WorkoutStoreActionCreators.removeWorkout(index);
    },

    defaultHandler(e, item, index) {
        console.log(item, index);
    },

    editHandler(e, item, index) {
        AppStateActionCreators.openModal(
            <WorkoutForm edit={true} workout={item} />
        );
    },

    render() {
            var handlers = {
                default: this.defaultHandler,
                delete: this.deleteHandler,
                edit: this.editHandler
            }

        return (
            <div className='page workouts'>
                <List editAble={this.state.editAble} handlers={handlers} items={this.state.workouts}></List>
            </div>
        );
    },

    componentDidMount() {
        var self = this;
        WorkoutStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        WorkoutStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({workouts: WorkoutStore.getWorkouts()});
    }
});

module.exports = Workouts;

