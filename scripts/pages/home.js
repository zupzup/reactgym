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
            trainingDiv = <div onClick={this.goToTrainingHandler} className='activeTraining'><i className='ion-ios-pulse'></i> {activeTraining.getIn(['workout', 'label'])}</div>;
            timerDiv = <div className='timer'>{this.state.timer} <i className='ion-android-time'></i></div>;
        }
        return (
            <div className='page home'>
                {trainingDiv}
                {timerDiv}
                <h2><i className='ion-folder'></i> Recent Trainings:</h2>
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

