var ReactTools = require('react-tools');
var babel = require('babel-core');
module.exports = {
    process: function(src, file) {
        if (!file.match(/.*\/(__tests__|scripts|react-router|StubRouterContext).*/)) {
            return src;
        }
        var stage = process.env.BABEL_JEST_STAGE || 2;
        var canCompile = babel.canCompile(file);

        if (!canCompile) {
            return "";
        }

        if (file.indexOf("node_modules") === -1) {
            return babel.transform(src, {filename: file, stage: stage}).code;
        }

        return src;
    }
};
