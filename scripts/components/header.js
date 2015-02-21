'use strict';

var React = require('react/addons'),
    Router = require('react-router'),
    HeaderState = require('../stores/HeaderState'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var Header = React.createClass({
    mixins: [Router.State, Router.Navigation, PureRenderMixin],

    getInitialState() {
        return {
            config: HeaderState.getConfig()
        };
    },

    back() {
        this.goBack();
    },

    render() {
        var currentRoute = this.getRoutes().reverse()[0].name,
            add,
            config = this.state.config,
            editMode,
            title,
            showBack = (!config.back || currentRoute === 'home') ? 'hide' : '';
        if(config.title && config.title.visible) {
            title = <span className="headertitle">{config.title.text}</span>; 
        }

        if(config.add && config.add.visible) {
            add = <span className="headeradd" onClick={config.add.handler}></span>;
        }

        if(config.editMode && config.editMode.visible) {
            editMode = <div className="headeredit" onClick={config.editMode.handler}></div>;
        }
        return (
            <div className='header'>
                <span className="headermenu" onClick={AppStateActionCreators.toggleMenu}></span>
                <span className={"back " + showBack} onClick={this.back}></span>
                {title}
                {add}
                {editMode}
            </div>
        );
    },

    componentDidMount() {
        HeaderState.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        HeaderState.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({config: HeaderState.getConfig()});
    }
});

module.exports = Header;

