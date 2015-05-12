'use strict';

let React = require('react/addons'),
    _ = require('lodash'),
    ListItem = require('../components/ListItem');

let List = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState() {
        return {
            activeIndex: null
        };
    },

    defaultHandler() {
    },

    render() {
        let self = this,
            listItems = this.props.items.map((item, index) => {
                let handlers = _.transform(self.props.handlers, (result, handler, key) => {
                    let handlerFnc = result[key] = self._createHandlerFunction(item, index, handler);
                    return handlerFnc;
                }),
                    isActive;
                if (this.props.activeIndex == null) {
                    isActive = this.state.activeIndex === index;
                } else {
                    isActive = this.props.activeIndex === index;
                }

                return (<ListItem active={isActive} editAble={self.props.editAble} key={item.label}
                label={item.label} handlers={handlers} />);
            });

        return (
            <div className="list">
                {listItems}
            </div>
        );
    },

    _createHandlerFunction(item, index, handler) {
        let handlerFunc = handler || this.defaultHandler;
        return (e) => {
            this.setState({activeIndex: index});
            e.stopPropagation();
            handlerFunc(e, item, index);
        };
    }
});

module.exports = List;

