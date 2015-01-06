'use strict';

var React = require('react/addons'),
    Header = require('./components/Header'),
    Menu = require('./components/Menu'),
    Router = require('react-router'),
    AppState = require('./stores/AppState'),
    AppStateActionCreators = require('./actions/AppStateActionCreators'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    DocumentTitle = require('react-document-title'),
    RouteHandler = Router.RouteHandler,
    Navigation = Router.Navigation;

var App = React.createClass({
    mixins: [Router.State, Navigation],

    getInitialState: function() {
        return {
            menuOpen: AppState.getMenuOpen(),
            nextTransition: AppState.getNextTransition()
        };
    },

    back: function() {
        if(history.state != null) {
            this.goBack();
        } else {
            this.transitionTo('/');
        }
    },

    contentHandler: function() {
        if(this.state.menuOpen) {
            AppStateActionCreators.closeMenu();
        }
    },

    render: function() {
        var name = this.getRoutes().reverse()[0].name,
            menuOpen = this.state.menuOpen ? 'open' : '';

        return (
            <DocumentTitle title='SimpleGym'>
                <div className='App'>
                    <Menu />
                    <div className={'contentArea ' + menuOpen} onClick={this.contentHandler}>
                        <Header backHandler={this.back} />
                        <ReactCSSTransitionGroup className='content' component="div" transitionName={AppState.getNextTransition()}>
                            <RouteHandler key={name} />
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </DocumentTitle>
        );
    },

    getStateFromStores: function() {
        return AppState.getAll();
    },

    componentDidMount: function() {
        AppState.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppState.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this.getStateFromStores());
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    }
});

module.exports = App;
