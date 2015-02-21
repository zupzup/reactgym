'use strict';

var React = require('react/addons'),
    AppStateActionCreators = require('../../actions/AppStateActionCreators'),
    ValidatedInput = require('./ValidatedInput'),
    PureRenderMixin = require('react').addons.PureRenderMixin,
    TrainingStore = require('../../stores/TrainingStore'),
    ExerciseStore = require('../../stores/ExerciseStore');

var TrainingForm = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState() {
        return {};
    },

    handleSubmit() {
        var reps = this.refs.reps.getDOMNode(),
            weight = this.refs.weight.getDOMNode();
        if(reps.className.indexOf('invalid') === -1 && weight.className.indexOf('invalid') === -1) {
            this.props.handler(this.props.exercise, reps.value, weight.value);
        }
    },

    render() {
        var self = this,
            exercise = ExerciseStore.getExerciseForId(this.props.exercise),
            sets = this.props.sets.map((item, index) => {
                var handler = () => {
                    AppStateActionCreators.removeSet(self.props.exercise, index);
                };
                return <span className='rep' key={index} onClick={handler}>{index + 1}</span>;
            }).toArray(),
            historyValues = TrainingStore.getLastInputsForExercise(this.props.exercise, sets.length);

       return (
            <div className='form training'>
                <div>{sets}</div>
                <h1>{exercise.get('label')}</h1>
                <div>
                    <span>
                        <ValidatedInput validator='number' ref='reps' placeholder='reps' className='reps' value={historyValues.rep}/><br />
                        <ValidatedInput validator='number' ref='weight' placeholder='weight' className='weight' value={historyValues.weight} /><br />
                    </span>
                    <span>
                        <button className='submitButton' onClick={this.handleSubmit}>Add</button> 
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = TrainingForm;

