'use strict';

var React = require('react'),
    List = require('../components/List'),
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    TrainingStore = require('../stores/TrainingStore.js'),
    Router = require('react-router'),
    PureRenderMixin = require('react').addons.PureRenderMixin,
    Immutable = require('immutable'),
    AppState = require('../stores/AppState');

var Home = React.createClass({
    mixins: [Router.Navigation, PureRenderMixin],

    getInitialState() {
        return {
            timer: AppState.getTimer()
        };
    },

    goToTrainingHandler() {
        this.transitionTo('training');
    },

    goToDetailHandler(e, item, index) {
        this.transitionTo('detail',{}, {training: item.id});
    },

    render() {
        var activeTraining = AppState.getActiveTraining(),
            handlers = {
                default: this.goToDetailHandler
            },
            trainingDiv,
            trainings = TrainingStore.getTrainings().map((item) => {
                var date = new Date(item.get('dateStart'));
                return item.set('label', date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ' - ' + item.getIn(['workout', 'label']));
            }).reverse(),
            timerDiv;

        if(activeTraining) {
            trainingDiv = <div onClick={this.goToTrainingHandler} className='activeTraining'><img src='styles/images/ios7-pulse.png' />{activeTraining.getIn(['workout', 'label'])}</div>;
            timerDiv = <div className='timer'>{this.state.timer}<img src='styles/images/android-timer.png' /></div>;
        }
        return (
            <div className='page home'>
                {trainingDiv}
                {timerDiv}
                <h2><img src='styles/images/folder.png' />Recent Trainings:</h2>
                <List handlers={handlers} editAble={false} items={trainings.toJS()}></List>
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

