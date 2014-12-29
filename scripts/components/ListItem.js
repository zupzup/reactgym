'use strict';

var React = require('react');

var ListItem = React.createClass({

    getInitialState: function() {
        return {};
    },

    render: function() {
        var tappable = this.props.handler ? 'tappable' : '';
        return (
            <div className={"listitem " + tappable} onClick={this.props.handler}>
                {this.props.label}
            </div>
        );
    }
});

module.exports = ListItem;

