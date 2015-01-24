'use strict';

var React = require('react/addons');

var Modal = React.createClass({
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

