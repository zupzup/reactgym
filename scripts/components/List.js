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
                var handlerFunc = self._createHandlerFunction(item, index, self.props.defaultHandler),
                    deleteHandler = self._createHandlerFunction(item, index, self.props.deleteHandler);
                return <ListItem deleteHandler={deleteHandler} editAble={self.props.editAble} key={item.label} label={item.label} handler={handlerFunc}></ListItem>;
            });

        return (
            <div className="list">
                {listItems}
            </div>
        );
    },

    _createHandlerFunction: function(item, index, defaultFunction) {
        var handlerFunc = item.handlerFunc;
        if(!handlerFunc || typeof handlerFunc !== 'function') {
            handlerFunc = defaultFunction || function() {};
        }
        return function(e) {
            e.stopPropagation();
            handlerFunc(e, item, index);
        };
    }
});

module.exports = List;

