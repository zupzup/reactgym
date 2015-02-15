'use strict';

var React = require('react'),
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators.js');

var SimpleHeaderMixin = {
    componentDidMount() {
        var self = this;
        HeaderStateActionCreators.setConfig({
            back: true,
            title:  {
                visible: true,
                text: self.header.title
            }
        });
    }
};

module.exports = SimpleHeaderMixin;
