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

// use eslint-webpack-plugin
const createForkTsCheckerPlugin = (conf = defaultConf) => new ForkTsCheckerWebpackPlugin(conf);

module.exports = {
    createForkTsCheckerPlugin,
    defaultConf,
};
