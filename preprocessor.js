var ReactTools = require('react-tools');
// var babel = require('babel');
module.exports = {
    process: function(src, file) {
        if(!file.match(/.*\/(__tests__|scripts|react-router).*/)) {
            return src;
        }
        return ReactTools.transform(src, { harmony: true });
        // return babel.transform("code", { experimental: true }).code;
    }
};
