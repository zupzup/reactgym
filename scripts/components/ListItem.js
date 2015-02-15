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
                <span className={"edit " + editAble} onClick={handlers.edit}><img src='styles/images/edit.png' />
                </span>
                <span className={"delete " + editAble} onClick={handlers.delete}><img src='styles/images/trash-a.png' /></span>{this.props.label}
            </div>
        );
    }
});

module.exports = ListItem;

