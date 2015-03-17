'use strict';

let React = require('react'),
    assign = require('object-assign');

let StubRouterContext = (Component, props, stubs) => {
    return React.createClass({
        childContextTypes: {
            router: React.PropTypes.object
        },

        getChildContext () {
            var routerContext = assign({
                makePath: jest.genMockFn(),
                makeHref: jest.genMockFn(),
                transitionTo: jest.genMockFn(),
                replaceWith: jest.genMockFn(),
                goBack: jest.genMockFn(),
                getCurrentPath: jest.genMockFn(),
                getCurrentRoutes: jest.genMockFn(),
                getCurrentPathname: jest.genMockFn(),
                getCurrentParams: jest.genMockFn(),
                getCurrentQuery: jest.genMockFn(),
                isActive: jest.genMockFn()
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

