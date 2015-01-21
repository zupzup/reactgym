var ValidationUtil = {
    getValidationFunction: function(validator) {
        //TODO: real implementation, map etc.
        if(validator === 'number') {
            return {
                test: function(value) { return /\d/.test(value); }
            };
        }
        return {
            test: function(value) { return true; }
        };
    }
};

module.exports = ValidationUtil;
