'use strict';

import React from 'react/addons';

let MenuButton = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    render() {
        let icon = this.props.icon ? <i className={this.props.icon}></i> : null;
        return (
            <div className='menubutton' onClick={this.props.handler}>
                {icon} {this.props.name}
            </div>
        );
    }
});

module.exports = MenuButton;
