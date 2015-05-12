'use strict';

let React = require('react/addons');

let Modal = React.createClass({
    mixins: [React.addons.PureRenderMixin],

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

