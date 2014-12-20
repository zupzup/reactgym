'use strict';

var React = require('react/addons'),
    Header = require('./components/header'),
    Menu = require('./components/menu'),
    Router = require('react-router'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    DocumentTitle = require('react-document-title'),
    RouteHandler = Router.RouteHandler,
    Navigation = Router.Navigation;

var App = React.createClass({
    mixins: [Router.State, Navigation],
    nextTransition: null,

    getInitialState() {
        return {
            menuPoints: [
                {
                    name: 'Home',
                    link: 'home'
                },
                {
                    name: 'Exercises',
                    link: 'exercises'
                },
                {
                    name: 'Workouts',
                    link: 'workouts'
                }
            ],
            menuOpen: false
        };
    },

    toggleMenu() {
        this.setState({
            menuPoints: this.state.menuPoints,
            menuOpen: !this.state.menuOpen
        });
    },

    getTransition(nextTransition) {
        var transition = nextTransition ? nextTransition : 'slide';
        this.nextTransition = null;
        return transition;
    },

    closeMenu() {
        this.setState({
            menuPoints: this.state.menuPoints,
            menuOpen: false
        });
    },

    back() {
        this.nextTransition = 'slideBack';
        this.goBack();
    },

    render() {
        var name = this.getRoutes().reverse()[0].name,
            transition = this.getTransition(this.nextTransition),
            open = this.state.menuOpen ? 'open' : '';
        return (
            <DocumentTitle title='Simple Gym 3.0'>
                <div className='App'>
                    <Menu closeHandler={this.closeMenu} items={this.state.menuPoints}/>
                    <div className={'contentArea ' + open}>
                        <Header menuHandler={this.toggleMenu} backHandler={this.back} />
                        <ReactCSSTransitionGroup className='content' component="div" transitionName={transition}>
                            <RouteHandler key={name} />
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});

module.exports = App;
