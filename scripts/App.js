'use strict';

var React = require('react/addons'),
    Header = require('./components/header'),
    Menu = require('./components/menu'),
    Router = require('react-router'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    DocumentTitle = require('react-document-title'),
    RouteHandler = Router.RouteHandler;

var App = React.createClass({
    mixins: [Router.State],

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
                    link: 'exercises'
                }
            ],
            menuOpen: true
        };
    },

    toggleMenu() {
        this.setState({
            menuPoints: this.state.menuPoints,
            menuOpen: !this.state.menuOpen
        });
    },

    render() {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <DocumentTitle title='Simple Gym 3.0'>
                <div className='App'>
                    <Menu open={this.state.menuOpen} items={this.state.menuPoints}/>
                    <div className='contentArea'> 
                        <Header menuHandler={this.toggleMenu} />
                        <ReactCSSTransitionGroup component="div" transitionName="fade">
                            <RouteHandler key={name} />
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});

module.exports = App;
