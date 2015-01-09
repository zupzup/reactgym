'use strict';

var React = require('react');

var ListItem = React.createClass({

    getInitialState: function() {
        return {};
    },

    render: function() {
        var tappable = this.props.handler ? 'tappable' : '',
            editAble = this.props.editAble ? 'show' : '';
        return (
            <div className={"listitem " + tappable} onClick={this.props.handler}>
                <span className={"delete " + editAble} onClick={this.props.deleteHandler}>delete</span>{this.props.label}
            </div>
        );
    }
});

module.exports = ListItem;

