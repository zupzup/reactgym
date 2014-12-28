var React = require('react/addons');

var MenuButton = React.createClass({
    render: function() {
        return (
            <div className='menubutton' onClick={this.props.handler}>
                {this.props.name}
            </div>
        );
    }
});

module.exports = MenuButton;

