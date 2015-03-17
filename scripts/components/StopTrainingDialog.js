'use strict';

let React = require('react'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

let StopTrainingDialog = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState() {
        return {};
    },

    render() {
        return (
            <div className='stopTraining'>
                <div>Finish?</div>
                <div>
                    <button className='yes' onClick={this.props.yesHandler}>
                        yes
                    </button>
                    <button className='no' onClick={this.props.noHandler}>
                        no
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = StopTrainingDialog;

