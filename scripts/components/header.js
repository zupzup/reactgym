'use strict';

var React = require('react/addons'),
    Router = require('react-router'),
    HeaderState = require('../stores/HeaderState'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    Menu = require('../components/Menu');

var Header = React.createClass({
    mixins: [Router.State, Router.Navigation],

    getInitialState: function() {
        return {
            config: HeaderState.getConfig()
        };
    },

    back: function() {
        if(history.state != null) {
            this.goBack();
        } else {
            this.transitionTo('/');
        }
    },

    render: function() {
        var currentRoute = this.getRoutes().reverse()[0].name,
            add,
            config = this.state.config,
            editMode,
            title,
            showBack = (!config.back || history.state == null || currentRoute === 'home') ? 'hide' : '';

        if(config.title && config.title.visible) {
            title = <span className="headertitle">{config.title.text}</span>; 
        }

        if(config.add && config.add.visible) {
            add = <span className="headeradd" onClick={config.add.handler}>add</span>;
        }

        if(config.editMode && config.editMode.visible) {
            editMode = <span className="headeredit" onClick={config.editMode.handler}>edit</span>;
        }

        return (
            <div className='header'>
                <span className="headermenu" onClick={AppStateActionCreators.toggleMenu}>menu</span>
                <span className={"back " + showBack} onClick={this.back}>back</span>
                {title}
                {add}
                {editMode}
            </div>
        );
    },

    componentDidMount: function() {
        HeaderState.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        HeaderState.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({config: HeaderState.getConfig()});
    }
});

module.exports = Header;

