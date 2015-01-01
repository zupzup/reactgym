'use strict';

var React = require('react'),
    ListItem = require('../components/ListItem');

var List = React.createClass({

    getInitialState: function() {
        return {};
    },

    render: function() {
        var self = this,
            listItems = this.props.items.map(function(item, index) {
                var handlerFunc = self._createHandlerFunction(item, index);
                return <ListItem key={item.label} label={item.label} handler={handlerFunc}></ListItem>;
            });

        return (
            <div className="list">
                {listItems}
            </div>
        );
    },

    _createHandlerFunction: function(item, index) {
        handlerFunc = item.handlerFunc;
        if(!handlerFunc || typeof handlerFunc !== 'function') {
            handlerFunc = this.props.defaultHandler || function() {};
        }
        return function() {
            handlerFunc(item, index);
        };
    }
});

module.exports = List;

