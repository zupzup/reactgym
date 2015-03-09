'use strict';

let React = require('react/addons'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

let ListItem = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {};
    },

    render() {
        let handlers = this.props.handlers, 
            active = this.props.active ? ' active' : '',
            tappable = handlers.default ? ' tappable' : '',
            editAble = this.props.editAble ? 'show' : '';

        return (
            <div className={"listitem" + tappable + active} onClick={handlers.default}>
                <span className={"edit " + editAble} onClick={handlers.edit}><i className='ion-edit'></i>
                </span>
                <span className={"delete " + editAble} onClick={handlers.delete}><i className='ion-trash-a'></i></span>{this.props.label}
            </div>
        );
    }
});

module.exports = ListItem;

