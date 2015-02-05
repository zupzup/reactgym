'use strict';

var React = require('react/addons'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var ListItem = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {};
    },

    render() {
        var handlers = this.props.handlers, 
            active = this.props.active ? ' active' : '',
            tappable = handlers.default ? ' tappable' : '',
            editAble = this.props.editAble ? 'show' : '';

        return (
            <div className={"listitem" + tappable + active} onClick={handlers.default}>
                <span className={"edit " + editAble} onClick={handlers.edit}>edit</span>
                <span className={"delete " + editAble} onClick={handlers.delete}>delete</span>{this.props.label}
            </div>
        );
    }
});

module.exports = ListItem;

