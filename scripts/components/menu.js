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
        let self = this,
            menuPoints = this.state.menuPoints.map((item) => {
                let handlerFunc = () => {
                    AppStateActionCreators.closeMenu();
                    self.transitionTo(item.link);
                };
                return <MenuButton key={item.name} icon={item.icon} name={item.name} handler={handlerFunc}></MenuButton>;
            });
        /* istanbul ignore next */
        let {className, ...prps} = this.props;

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

