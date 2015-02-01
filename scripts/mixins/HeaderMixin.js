'use strict';

var React = require('react'),
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators.js');

var HeaderMixin = {
    componentDidMount() {
        var self = this;
        HeaderStateActionCreators.setConfig({
            back: true,
            title:  {
                visible: true,
                text: self.header.title
            },
            add: {
                visible: true,
                handler: self.header.add
            },
            editMode: {
                visible: true,
                handler: self.header.edit.bind(self)
            }
        });
    },
}

module.exports = HeaderMixin;
