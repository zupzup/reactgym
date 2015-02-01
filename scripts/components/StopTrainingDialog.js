'use strict';

var React = require('react');

var StopTrainingDialog = React.createClass({
    getInitialState() {
        return {};
    },

    render() {
       return (
            <div className='stopTraining'>
                <div>Finish?</div>
                <div><button className='yes' onClick={this.props.yesHandler}>yes</button> <button className='no' onClick={this.props.noHandler}>no</button></div>
            </div>
        );
    },
});

module.exports = StopTrainingDialog;

