'use strict';

var React = require('react/addons'),
    Header = require('./components/Header'),
    Menu = require('./components/Menu'),
    Router = require('react-router'),
    AppState = require('./stores/AppState'),
    AppStateAcitonCreators = require('./actions/AppStateActionCreators'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    DocumentTitle = require('react-document-title'),
    RouteHandler = Router.RouteHandler,
    Navigation = Router.Navigation;

var App = React.createClass({
    mixins: [Router.State, Navigation],
    nextTransition: null,

    getInitialState() {
        return {
            menuOpen: false,
            nextTransition: 'slide'
        };
    },

    getStateFromStores() {
        return {
            nextTransition: AppState.getNextTransition()
        };
    },

    componentDidMount() {
        AppState.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        AppState.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState(getStateFromStores());
    },


    shouldComponentUpdate(nextProps, nextState) {
        return !(this.state.nextTransition !== nextState.nextTransition && nextState.nextTransition === 'slide');
    },

    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen,
        });
    },

    closeMenu() {
        this.setState({
            menuOpen: false,
        });
    },

    back() {
        AppStateAcitonCreators.setNextTransition('slideBack');
        if(history.state != null) {
            this.goBack();
        } else {
            this.transitionTo('/');
        }
        AppStateAcitonCreators.resetTransitions();
    },

    render() {
        var name = this.getRoutes().reverse()[0].name,
            menuOpen = this.state.menuOpen ? 'open' : '', //TODO: move to store
            contentHandler = null;

        if(menuOpen) {
            contentHandler = this.closeMenu; 
        }
        return (
            <DocumentTitle title='Simple Gym 3.0'>
                <div className='App'>
                    <Menu closeHandler={this.closeMenu} />
                    <div className={'contentArea ' + menuOpen} onClick={contentHandler}>
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
