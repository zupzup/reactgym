'use strict';

var React = require('react/addons'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var MenuButton = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        var icon = this.props.icon ? <i className={this.props.icon}></i> : null;
        return (
            <div className='menubutton' onClick={this.props.handler}>
                {icon} {this.props.name}
            </div>
        );
    }
});

module.exports = MenuButton;

