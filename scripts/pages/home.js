'use strict';

let React = require('react'),
    List = require('../components/List'),
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators'),
    TrainingStore = require('../stores/TrainingStore.js'),
    Router = require('react-router'),
    SimpleHeaderMixin = require('../mixins/SimpleHeaderMixin'),
    PureRenderMixin = require('react').addons.PureRenderMixin,
    Immutable = require('immutable'),
    AppState = require('../stores/AppState');

let Home = React.createClass({
    header: {
        title: 'Home'
    },
    mixins: [Router.Navigation, PureRenderMixin, SimpleHeaderMixin],

    getInitialState() {
        return {
            timer: AppState.getTimer()
        };
    },

    goToTrainingHandler() {
        this.context.router.transitionTo('training');
    },

    goToDetailHandler(e, item, index) {
        this.context.router.transitionTo('detail',{}, {training: item.id});
    },

    render() {
        let activeTraining = AppState.getActiveTraining(),
            handlers = {
                default: this.goToDetailHandler
            },
            trainingDiv,
            trainings = TrainingStore.getTrainings().map((item) => {
                let date = new Date(item.get('dateStart'));
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

    componentDidMount() {
        let self = this;
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

