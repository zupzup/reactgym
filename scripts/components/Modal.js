'use strict';

var React = require('react/addons'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var Modal = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        var modalOpen = this.props.content ? 'open' : '';
        return (
            <div className={'modal ' + modalOpen}>
                {this.props.content}
                <span className='close' onClick={this.props.closeHandler}></span>
            </div>
        );
    }
});

module.exports = Modal;

