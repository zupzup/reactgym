'use strict';

let React = require('react/addons'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

let Modal = React.createClass({
    mixins: [PureRenderMixin],

    componentDidUpdate() {
        let node = this.getDOMNode();
        node.scrollIntoView();
    },

    render() {
        let modalOpen = this.props.content ? 'open' : '';
        return (
            <div className={'modal ' + modalOpen}>
                {this.props.content}
                <a className='close ion-close-circled' onClick={this.props.closeHandler}></a>
            </div>
        );
    }
});

module.exports = Modal;

