'use strict';

let React = require('react'),
assign = require('object-assign');

let StubRouterContext = (Component, props, stubs) => {
    return React.createClass({
        childContextTypes: {
            router: React.PropTypes.object,
        },

        getChildContext () {
            var routerContext = assign({
                makePath () {},
                makeHref () {},
                transitionTo () {},
                replaceWith () {},
                goBack () {},
                getCurrentPath () {},
                getCurrentRoutes () {},
                getCurrentPathname () {},
                getCurrentParams () {},
                getCurrentQuery () {},
                isActive () {},
            }, stubs);
            return {
                router: routerContext
            };
        },

        render () {
            return <Component {...props} />;
        }
    });
};

module.exports = StubRouterContext;

