'use strict';

var React = require('react/addons'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var MenuButton = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        return (
            <div className='menubutton' onClick={this.props.handler}>
                {this.props.name}
            </div>
        );
    }
});

module.exports = MenuButton;

