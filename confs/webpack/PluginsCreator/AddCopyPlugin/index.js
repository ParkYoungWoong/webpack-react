const CopyPlugin = require('copy-webpack-plugin');
const deepFreeze = require('deep-freeze-strict');

// default configuration
const defaultConf = deepFreeze({
    patterns: [{ from: 'static' }],
});

// use eslint-webpack-plugin
const createPlugin = (conf = defaultConf) => new CopyPlugin(conf);

module.exports = {
    createPlugin,
    defaultConf,
};