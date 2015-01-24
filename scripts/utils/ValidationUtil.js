var ValidationUtil = {
    getValidationFunction: function(validator) {
        //TODO: real implementation, map etc.
        if(validator === 'number') {
            return {
                test: (value) => { return /\d/.test(value); }
            };
        }
        return {
            test: (value) => { return true; }
        };
    }
};

module.exports = ValidationUtil;
