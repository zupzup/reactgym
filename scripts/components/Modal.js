'use strict';

var React = require('react/addons'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var Modal = React.createClass({
    mixins: [PureRenderMixin],

    componentDidUpdate() {
        var node = this.getDOMNode();
        node.scrollIntoView();
    },

    render() {
        var modalOpen = this.props.content ? 'open' : '';
        return (
            <div className={'modal ' + modalOpen}>
                {this.props.content}
                <a className='close ion-close-circled' onClick={this.props.closeHandler}></a>
            </div>
        );
    }
});

module.exports = Modal;

