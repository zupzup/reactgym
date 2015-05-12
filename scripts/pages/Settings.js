'use strict';

import React from 'react';
import SimpleHeaderMixin from '../mixins/SimpleHeaderMixin';
import SettingsStore from '../stores/SettingsStore';
import SettingsStoreActionCreators from '../actions/SettingsStoreActionCreators';
import ValidatedInput from '../components/forms/ValidatedInput';

let Settings = React.createClass({
    header: {
        title: 'Settings'
    },
    mixins: [SimpleHeaderMixin, React.addons.PureRenderMixin],

    getInitialState() {
        return {
            restTimer: SettingsStore.getRestTimer()
        };
    },

    onRestTimerChange() {
        SettingsStoreActionCreators.setRestTimer(this.refs.restTimer.getDOMNode().value);
    },

    render() {
        return (
            <div className='page settings'>
                <h2><i className='ion-android-time'></i> Rest-Timer</h2>
                <div className="settingsform">
                    <div>
                        <ValidatedInput changeHandler={this.onRestTimerChange}
                            validator='number' ref='restTimer' placeholder='90' value={this.state.restTimer} />
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
