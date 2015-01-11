'use strict';

var React = require('react');

var ListItem = React.createClass({

    getInitialState: function() {
        return {};
    },

    render: function() {
        var handlers = this.props.handlers, 
            tappable = handlers.default ? 'tappable' : '',
            editAble = this.props.editAble ? 'show' : '';
        return (
            <div className={"listitem " + tappable} onClick={handlers.default}>
                <span className={"delete " + editAble} onClick={handlers.delete}>delete</span>{this.props.label}
            </div>
        );
    }
});

module.exports = ListItem;

