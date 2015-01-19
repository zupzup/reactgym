'use strict';

var React = require('react');

var StopTrainingDialog = React.createClass({
    getInitialState: function() {
        return {};
    },

    render: function() {
       return (
            <div>
                <div>Do you really want to finish the training?</div>
                <div><button onClick={this.props.yesHandler}>yes</button> | <button onClick={this.props.noHandler}>no</button></div>
            </div>
        );
    },
});

module.exports = StopTrainingDialog;

