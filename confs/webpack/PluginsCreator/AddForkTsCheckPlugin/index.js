const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const deepFreeze = require('deep-freeze-strict');

// default configuration
const defaultConf = deepFreeze({
    typescript: {
        diagnosticOptions: {
            semantic: true,
            syntactic: false,
        },
    },
});

// use fork-ts-checker-webpack-plugin
const createForkTsCheckerPlugin = (conf = {}) =>
    new ForkTsCheckerWebpackPlugin({
        ...defaultConf,
        ...conf,
    });

module.exports = {
    createForkTsCheckerPlugin,
    defaultConf,
};
