'use strict';

var React = require('react'),
    List = require('../components/List'),
    TrainingStore = require('../stores/TrainingStore.js'),
    ExerciseStore = require('../stores/ExerciseStore.js'),
    Router = require('react-router'),
    _ = require('lodash'),
    SimpleHeaderMixin = require('../mixins/SimpleHeaderMixin'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var TrainingDetail = React.createClass({
    header: {
        title: 'Detail'
    },
    mixins: [Router.State, PureRenderMixin, SimpleHeaderMixin],

    getInitialState() {
        return {};
    },

    render() {
        var training = TrainingStore.getTrainingForId(this.getQuery().training);
        if(training) {
            var exercises = ExerciseStore.getExercises();
            training = training.toJS();
            var sets = _.map(training.sets, (set, exercise) => {
                var sets = set.map((item, idx) => {
                    return <div className='set' key={idx}><span className='count'>#{idx + 1}</span><span className='repsweight'>Reps: {item.reps} / Weight: {item.weight}</span></div>;
                });
                return (
                    <div className='exercise' key={exercise}>
                        <div><strong>{exercises.find(e => e.get('id') == exercise).get('label')}</strong></div>
                        <div>{sets}</div>
                    </div>);
            });
            return (
                <div className='page trainingdetail'>
                    <h2>{training.workout.label}</h2>
                    <div className='date'><img src='../styles/images/calendar.png' />{new Date(training.date).toLocaleString()}</div>
                    {sets}
                </div>
            );
        } else {
            return (
                <div className='page trainingdetail'>
                    invalid Id
                </div>
            );
        }
    }
});

module.exports = TrainingDetail;

