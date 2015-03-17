module.exports = {
    getValidationFunction(validator) {
        if (validator === 'number') {
            return {
                test: (value) => {
                    return /^\d+$/.test(value);
                }
            };
        }
        return {
            test: () => {
                return true;
            }
        };
    }
};

