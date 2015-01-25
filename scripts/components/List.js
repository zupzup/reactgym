'use strict';

var React = require('react'),
    _ = require('lodash'),
    ListItem = require('../components/ListItem');

var List = React.createClass({

    getInitialState() {
        return {};
    },

    render() {
        var self = this,
            listItems = this.props.items.map((item, index) => {
                var handlers = _.transform(self.props.handlers, (result, handler, key) => {
                    return result[key] = self._createHandlerFunction(item, index, handler);
                });

                return <ListItem editAble={self.props.editAble} key={item.label} label={item.label} handlers={handlers}></ListItem>;
            });

        return (
            <div className="list">
                {listItems}
            </div>
        );
    },

    _createHandlerFunction(item, index, handler) {
        var handlerFunc = handler || function() {};
        return (e) => {
            e.stopPropagation();
            handlerFunc(e, item, index);
        };
    }
});

module.exports = List;

