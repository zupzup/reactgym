var ReactTools = require('react-tools');
module.exports = {
    process: function(src, file) {
        if(!file.match(/.*\/(__tests__|scripts).*/)) {
            return src;
        }
        return ReactTools.transform(src, { harmony: true });
    }
};
