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
            menuOpen: false,
            nextTransition: 'slide'
        };
    },

    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen,
        });
    },

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.state.nextTransition !== nextState.nextTransition && nextState.nextTransition === 'slide');
    },

    closeMenu() {
        this.setState({
            menuOpen: false,
        });
    },

    back() {
        this.setState({
            nextTransition: 'slideBack'
        });
        if(history.state != null) {
            this.goBack();
        } else {
            this.transitionTo('/');
        }
        // reset transition
        this.setState({
            nextTransition: 'slide'
        });
    },

    render() {
        var name = this.getRoutes().reverse()[0].name,
            open = this.state.menuOpen ? 'open' : ''; //TODO: move to store
        return (
            <DocumentTitle title='Simple Gym 3.0'>
                <div className='App'>
                    <Menu closeHandler={this.closeMenu} items={this.state.menuPoints}/>
                    <div className={'contentArea ' + open}>
                        <Header menuHandler={this.toggleMenu} backHandler={this.back} />
                        <ReactCSSTransitionGroup className='content' component="div" transitionName={this.state.nextTransition}>
                            <RouteHandler key={name} />
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});

module.exports = App;
