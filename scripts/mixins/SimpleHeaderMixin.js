'use strict';

let React = require('react'),
    HeaderStateActionCreators = require('../actions/HeaderStateActionCreators.js');

let SimpleHeaderMixin = {
    componentDidMount() {
        let self = this;
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
