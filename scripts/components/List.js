'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    ListItem = require('../components/ListItem'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var List = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            activeIndex: null
        };
    },

    defaultHandler(e, item, index) {
    },

    render() {
        var self = this,
            listItems = this.props.items.map((item, index) => {
                var handlers = _.transform(self.props.handlers, (result, handler, key) => {
                        return result[key] = self._createHandlerFunction(item, index, handler);
                    }),
                    isActive;
                if(this.props.activeIndex == null) {
                    isActive = this.state.activeIndex === index;
                } else {
                    isActive = this.props.activeIndex === index;
                }

                return <ListItem active={isActive} editAble={self.props.editAble} key={item.label} label={item.label} handlers={handlers}></ListItem>;
            });

        return (
            <div className="list">
                {listItems}
            </div>
        );
    },

    _createHandlerFunction(item, index, handler) {
        var handlerFunc = handler || this.defaultHandler;
        return (e) => {
            this.setState({activeIndex: index});
            e.stopPropagation();
            handlerFunc(e, item, index);
        };
    }
});

module.exports = List;

