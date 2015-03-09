'use strict';

let React = require('react'),
    SimpleHeaderMixin = require('../mixins/SimpleHeaderMixin'),
    SettingsStore = require('../stores/SettingsStore'),
    SettingsStoreActionCreators = require('../actions/SettingsStoreActionCreators'),
    ValidatedInput = require('../components/forms/ValidatedInput'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

let Settings = React.createClass({
    header: {
        title: 'Settings'
    },
    mixins: [SimpleHeaderMixin, PureRenderMixin],

    getInitialState() {
        return {
            restTimer: SettingsStore.getRestTimer()
        };
    },

    onRestTimerChange(e) {
        SettingsStoreActionCreators.setRestTimer(this.refs.restTimer.getDOMNode().value);
    },

    render() {
        let handlers = {
            default: this.handleRestore
        };
        return (
            <div className='page settings'>
                <h2><i className='ion-android-time'></i> Rest-Timer</h2>
                <div className="settingsform">
                    <div>
                        <ValidatedInput changeHandler={this.onRestTimerChange} validator='number' ref='restTimer' placeholder='90' value={this.state.restTimer} />
                    </div>
                </div>
            </div>
        );
    },

    componentDidMount() {
        SettingsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        SettingsStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({restTimer: SettingsStore.getRestTimer()});
    }
});

module.exports = Settings;

