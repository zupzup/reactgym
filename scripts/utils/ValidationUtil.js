var ValidationUtil = {
    getValidationFunction(validator) {
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
