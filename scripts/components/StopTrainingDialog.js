'use strict';

let React = require('react');

let StopTrainingDialog = React.createClass({
    mixins: [React.addons.PureRenderMixin],
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

