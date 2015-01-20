'use strict';

var React = require('react');

var StopTrainingDialog = React.createClass({
    getInitialState: function() {
        return {};
    },

    render: function() {
       return (
            <div className='stopTraining'>
                <div>Finish?</div>
                <div><button onClick={this.props.yesHandler}>yes</button> <button onClick={this.props.noHandler}>no</button></div>
            </div>
        );
    },
});

module.exports = StopTrainingDialog;

