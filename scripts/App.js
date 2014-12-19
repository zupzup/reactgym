'use strict';

var React = require('react/addons'),
    Menu = require('./components/menu'),
    Router = require('react-router'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    DocumentTitle = require('react-document-title'),
    RouteHandler = Router.RouteHandler;

var App = React.createClass({
    mixins: [Router.State],

    render() {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <DocumentTitle title='Simple Gym 3.0'>
                <div className='App'>
                    <Menu />
                    <ReactCSSTransitionGroup component="div" transitionName="fade">
                        <RouteHandler key={name} />
                    </ReactCSSTransitionGroup>
                </div>
            </DocumentTitle>
        );
    }
});

module.exports = App;
