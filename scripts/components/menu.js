'use strict';

var React = require('react'),
    MenuButton = require('../components/MenuButton'),
    MenuStore = require('../stores/MenuStore.js'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    Router = require('react-router'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var Menu = React.createClass({
    mixins: [Router.Navigation, PureRenderMixin],

    getInitialState() {
        return {
            menuPoints: MenuStore.getMenuPoints()
        };
    },

    render() {
        var self = this,
            {className, ...rest} = this.props;
            menuPoints = this.state.menuPoints.map((item) => {
            var handlerFunc = () => {
                AppStateActionCreators.closeMenu();
                self.transitionTo(item.link);
            };
            return <MenuButton key={item.name} name={item.name} handler={handlerFunc}></MenuButton>;
        });

        return (
            <div className={className + ' menu'}>
                {menuPoints}
            </div>
        );
    },

    componentDidMount() {
        MenuStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        MenuStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({menuPoints: MenuStore.getMenuPoints()});
    }
});

module.exports = Menu;

